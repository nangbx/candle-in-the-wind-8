import * as types from '../Constants/ThongBao'

export const notifySuccess = mess =>({
    type: types.SUCCESS,
    data: mess
})
export const notifyError = mess => ({
    type: types.ERROR,
    data: mess
})
export const notifyWarning = mess => ({
    type: types.WARNING,
    data: mess
})