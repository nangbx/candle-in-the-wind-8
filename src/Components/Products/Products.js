import { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import ProductItem from "./ProductItem";
import "./Products.scss";
import {API_URL} from '../../const'
import ScrollToTop from "react-scroll-to-top";
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    fetch(
      `${API_URL}/api/Products`
    )
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, []);
  const handleShow = () => {
    
  };
  return (
    <div>
      <Slider />
      <ScrollToTop smooth />
      <div className="product">
        {products.map((item) => (
          <ProductItem key={item.id} data={item} />
        ))}
      </div>
      <div className="showmore">
        <a className="show" onClick={handleShow} href="true">
          Show more
        </a>
      </div>
    </div>
  );
}
