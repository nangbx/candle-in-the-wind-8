import * as types from "../Constants/Comment"
import {callPostApi, callGetApi, callDeleteApi, callPutApi} from "../utils/callApi"
import {  notifySuccess } from "./Notify"


export const getComment = (data) => ({
    type: types.GET_COMMENT,
    data
})
export const actFetchGetComment = (id) => {
    return (dispatch) => {
        return callGetApi(`api/Comments/${id}`).then(res => {
            dispatch(getComment(res));
        });
    }
}
export const actFetchAddComment = (id, body) => {
    return (dispatch) => {
        const check = {res: false, body: body};
        return callPostApi(`api/Comments/${id}`, check).then(res => {
            dispatch(actFetchGetComment(id));
            dispatch(notifySuccess('Đã thêm bình luận thành công'))
        });
    }
}

export const actFetchDeleteComment = (postID, commentID) => {
    return (dispatch) => {
        const check = {res: false};
        return callDeleteApi(`api/Comments/Post/${postID}/Comment/${commentID}`, check).then(res => {
            dispatch(actFetchGetComment(postID));
            dispatch(notifySuccess('Đã xóa bình luận'))
        });
    }
}
export const actFetchEditComment = (postID, commentID, body) => {
    return (dispatch) => {
        const check = {res: false, body: body};
        return callPutApi(`api/Comments/Post/${postID}/Comment/${commentID}`, check).then(res => {
            dispatch(actFetchGetComment(postID));
        });
    }
}