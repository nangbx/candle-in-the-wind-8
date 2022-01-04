import * as types from '../Constants/ThongBao'
import { toast } from "react-toastify";
const initialState = [

]

export default function notify (state = initialState, action){
    switch(action.type){
        case types.SUCCESS: {
            toast.success(action.data, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        }
        case types.ERROR: {
            toast.error(action.data, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        }
        case types.WARNING: {
            toast.warning(action.data, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        }
        default: {
            
        }
    }
    return state;
}