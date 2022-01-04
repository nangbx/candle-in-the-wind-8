import * as types from "../Constants/Comment"

const initialState = [

]


export default function comment (state = initialState, action) {
    switch(action.type){
        case types.GET_COMMENT: {
            return action.data
        }
        default: return initialState
    }
}