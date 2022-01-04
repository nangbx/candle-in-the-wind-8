import * as types from "../Constants/Dialog"

const initialState = {
    state: false
}
export default function dialog(state = initialState, action) {
    switch(action.type){
        case types.OPEN: {
            return {
                state: true
            }
        }
        case types.CLOSE: {
            return {
                state: false
            }
        }
        default:
            return state
    }
    
}