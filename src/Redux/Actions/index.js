import * as types from '../Constants/Users'
import { callGetApi, callPutApi} from "../utils/callApi";
import {notifySuccess, notifyWarning } from "./Notify"

export const getUser = () => ({
    type: types.GET_USER
})
export const getProfile = (data) => ({
    type: types.GET_PROFILE,
     data
})
export const actFetchGetProfile = () => {
    return (dispatch) => {
        return callGetApi('api/Users/Profile', 'GET', null).then(res => {
            dispatch(getProfile(res));
        });
    }
}
export const actUpdateProfileRequest = (profile) => {
    return (dispatch) => {
        const action = {res: false, body: profile};
        return callPutApi(`api/Users/UpdateProfile`, action).then(res => {
            if(action.res){
                dispatch(notifyWarning(res.error))
            } else{
                dispatch(notifySuccess('Thông tin của bạn đã được thay đổi'))
                dispatch(actFetchGetProfile());
            }
        });
    }
}
export const actChangePasswordRequest = (pass) => {
    return (dispatch) => {
        const action = {res: false, body: pass};
        return callPutApi(`api/Users/ChangePassword`, action).then(res => {
            if(action.res){
                dispatch(notifyWarning(res.error))
            } else{
                dispatch(notifySuccess('Mật khẩu đã được thay đổi'))
            }
        });
    }
}

export const loginUser = (data) => ({
    type: types.USER_LOGIN,
    data: data
})
export const logout = () => ({
    type: types.USER_LOGOUT
})

