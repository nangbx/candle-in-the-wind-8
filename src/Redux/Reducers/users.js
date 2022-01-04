import * as types from '../Constants/Users'
const initialState = {
    user: {},
    trang_thai: false,
}

export default function users(state = initialState, action){

    switch(action.type){
        case types.GET_USER: {
            return state
        }
        case types.USER_LOGIN: {
            return {
                ...state,
                trang_thai: true
            }
        }
        case types.USER_LOGOUT: {
            return {
                user: {},
                trang_thai: false
            }
        }
        case types.GET_PROFILE: {
            return {
                user: action.data,
                trang_thai: true
            }
        }
        default:{
            return state
        }
    }
}

