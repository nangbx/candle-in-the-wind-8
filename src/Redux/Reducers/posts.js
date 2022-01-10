import * as types from "../Constants/Posts"

const initialState = {
    posts: [

    ],
    reset: false,
    pageIndex: 1,
    totalPages: 1
}


export default function posts(state = initialState, action) {
    switch(action.type){
        case types.GET_POSTS:{
            return {
                posts:[
                    action.data.posts
                ],
                reset: false,
                pageIndex: action.data.pageIndex,
                totalPages: action.data.totalPages
            }
        }
        case types.TURN_OFF: {
            var bool = state.reset;
            return {
                ...state,
                reset: !bool
            }
        }
        default: return state
    }
    
}