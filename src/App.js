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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <ForumItem/>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/" element={<Products />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/cart" element={<Cart />}/>
          <Route path='/forum' element={<ListPost/>}/>
          <Route path="/forum/:id" element={<PostDetail/>}/>
          <Route path="/category/:id" element={<Category/>}/>
          <Route path="/account" element={<AccountInfo/>} />
          <Route path="/product/:key" element={<ProductSearch/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
