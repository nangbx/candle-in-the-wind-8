import { combineReducers } from "redux";
import notify from "./notify";
import users from './users'
import category from "./category";
import cart from "./cart";
import dialog from "./dialog";
import posts from "./posts";
import comment from "./comment";
const reducer = combineReducers(
    {
        users,
        notify,
        category,
        cart,
        dialog,
        posts,
        comment
    }
)
export default reducer