import * as types from "../Constants/Posts"

const initialState = {
    posts: [

    ],
    reset: false,
}


export default function posts(state = initialState, action) {
    switch(action.type){
        case types.GET_POSTS:{
            return {
                posts:[
                    action.data.posts
                ],
                reset: false
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