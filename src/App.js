import { useEffect } from "react";
import Header from "./Components/Header/Header";
import ProductDetail from "./Components/Products/ProductDetail";
import Products from "./Components/Products/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import Cart from "./Components/Cart/Cart";
import ListPost from "./Components/Forum/ListPost";
import PostDetail from "./Components/Forum/PostDetail";
import Category from "./Components/Category/Category"
import ForumItem from "./Components/Forum/ForumItem";
import AccountInfo from "./Components/AccountInfo/AccountInfo";
import ProductSearch from "./Components/Products/ProductSearch";
import NotFound from "./Components/NotFound/404NotFound";
import SearchPost from "./Components/Forum/SearchPost";
import Shop from "./Components/Shop/Shop";
import {API_URL} from "./Redux/Constants/Config"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProfile } from "./Redux/Actions";
function App() {
  const dispatch = useDispatch();
  const {  trang_thai } = useSelector((state) => state.users);
  useEffect(() => {

    const option = {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json',
      }),
    };

    if(localStorage.getItem("accessToken")){
      fetch(`${API_URL}/api/Users/Profile`, option)
      .then((response) => {
        if(response.ok)
          {
            return response.json();
          } 
      })
      .then(result => {
        if(typeof result === "object"){
          dispatch(getProfile(result))
        } else{
          localStorage.removeItem("accessToken");
        }
      })
    }
      // .then((result) => {
      //   delete result.password;
      //   if (typeof result === "object") {
      //     dispatch({ type: GET_USER, payload: result });
      //   } else {
      //     dispatch({ type: GET_USER, payload: null });
      //     localStorage.removeItem("accessToken");
      //     localStorage.removeItem("idUser");
      //   }
      // })
      // .catch((error) => console.log("error", error));

  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <ForumItem/>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/" element={<Products />} />
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/cart" element={trang_thai ? <Cart /> : <NotFound/>}/>
          <Route path='/forum' element={<ListPost/>}/>
          <Route path="/forum/:id" element={<PostDetail/>}/>
          <Route path="/forum/search/:key" element={<SearchPost/>}/>
          <Route path="/category/:id" element={<Category/>}/>
          <Route path="/account" element={ trang_thai ? <AccountInfo/> : <NotFound/>} />
          <Route path="/product/:key" element={<ProductSearch/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
