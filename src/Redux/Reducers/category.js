import * as types from "../Constants/Category"

const initialState = {
    data: []
}
export default function category  (state = initialState, action){
    switch(action.type){
        case types.SET_CATEGORY:{
            return {
                data: action.data
            }
        }
        default:
            return initialState
    }
} 