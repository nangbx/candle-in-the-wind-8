import * as Types from "../Constants/Cart"
import {callPostApi, callGetApi, callDeleteApi, callPutApi} from "../utils/callApi"
import { notifySuccess, notifyWarning } from "./Notify"

export const actFetchCartRequest = () => {
    return (dispatch) => {
        return callGetApi('api/Carts', 'GET', null).then(res => {
            dispatch(actFetchCart(res));
        });
    }
}

export const actFetchCart = (carts) => {
    return {
        type: Types.FETCH_CART,
        data: carts
    }
}

export const actAddProductRequest = (product) => {
    return (dispatch) => {
        const check = {res: false};
        return callPostApi(`api/Carts?productId=${product.id}&quantity=${product.count}`, check).then(res => {
            if(check.res){
                dispatch(notifyWarning(res.error))
            } else{
                dispatch(actFetchCartRequest());
                dispatch(notifySuccess('Đã thêm sản phẩm vào giỏ hàng'))
            }
        });
    }
}

export const actDeleteProductRequest = (id) => {
    return (dispatch) => {
        const check = {res: false};
        return callDeleteApi(`api/Carts/${id}`, check).then(res => {
            if(check.res){
                dispatch(notifyWarning(res.error))
            } else{
                dispatch(actFetchCartRequest());
                dispatch(notifySuccess('Đã xóa sản phẩm khỏi giỏ hàng'))
            }
        });
    }
}

export const actUpdateProductRequest = (product) => {
    return (dispatch) => {
        const check = {res: false};
        return callPutApi(`api/Carts/ChangeQuantity?productId=${product.id}&quantity=${product.count}`, check).then(res => {
            if(check.res){
                dispatch(notifyWarning(res.error))
            } else{
                dispatch(actFetchCartRequest());
            }
        });
    }
}

// export const actUpdateProduct = (product) => {
//     return {
//         type: Types.UPDATE_PRODUCT,
//         product
//     }
// }



// export const actDeleteProduct = (id) => {
//     return {
//         type: Types.DELETE_PRODUCT,
//         id
//     }
// }

// export const actGetProductRequest = (id) => {
//     return dispatch => {
//         return callApi(`/products/${id}`, 'GET', null).then(res => {
//             dispatch(actGetProduct(res.data))
//         });
//     }
// }

// export const actGetProduct = (product) => {
//     return {
//         type : Types.EDIT_PRODUCT,
//         product
//     }
// }
