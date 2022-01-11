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
import Feature from "./Components/Small/Feature";
import SearchPost from "./Components/Forum/SearchPost";
import Shop from "./Components/Shop/Shop";
import { useSelector } from "react-redux";
function App() {
  const { user, trang_thai } = useSelector((state) => state.users);
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
