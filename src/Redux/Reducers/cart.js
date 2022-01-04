import * as types from "../Constants/Cart"

const initialState = {
    products: [],
    productCount: 0,
    totalPrice: 0
}

export default function cart(state = initialState, action){
    switch(action.type){
        case types.FETCH_CART:{
            return action.data
        }
        default:
            return state
    }
}