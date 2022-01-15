import * as types from "../Constants/Posts"
import { callGetApi, callDeleteApi, callPutNotBody} from "../utils/callApi"
import { notifySuccess } from "./Notify"

export const getPost = (data) => ({
    type: types.GET_POSTS,
    data
})
export const turnOff = () => ({
    type: types.TURN_OFF
})
export const actFetchGetPost = (index) => {
    return (dispatch) => {
        return callGetApi(`api/Posts?pageIndex=${index}&pageSize=4`, 'GET', null).then(res => {
            dispatch(getPost(res));
        });
    }
}
export const actFetchDeletePost = (id) => {
    return (dispatch) => {
        const check = {res: false};
        return callDeleteApi(`api/Posts/MyPosts/${id}`, check).then(res => {
            if(check.res){

            } else{
                dispatch(actFetchGetPost('1'))
                dispatch(notifySuccess('Đã xóa bài viết'))
            }
        });
    }
}
export const actFetchTurnOff = (id) => {
    return (dispatch) => {
        return callPutNotBody(`api/Posts/MyPost/${id}`).then(res => {
            dispatch(actFetchGetPost());
            dispatch(turnOff())
        });
    }
}
