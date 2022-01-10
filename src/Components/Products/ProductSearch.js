import React, {useState, useEffect} from "react";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
import { API_URL } from "../../const";
import ScrollToTop from "react-scroll-to-top";
import BreadcrumbMenu from "../Small/BreadcrumbMenu";
export default function ProductSearch() {
    const {key} = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`${API_URL}/api/Products/Filter?searchText=${key}`)
            .then(res => {
				if(!res.ok){
					return;
				}
				return res.json();
			})
            .then(data => setProduct(data))
    }, [key])
    const handleShow  = () => {

    }
	var url = [
		{
			name: 'Home',
			path: '/'
		}
	]
	return (
		<React.Fragment>
			
            <ScrollToTop smooth />
			<BreadcrumbMenu url = {url} destination = 'Tìm kiếm'/>
			<div className="category">
            <h1>Từ khóa:  '{key}'</h1>
			<div className='category-list'>
				{product ? product.products.map((item) => (
					<ProductItem key={item.id} data={item} />
				)): 'Không có kết quả'}
			</div>
			<div className='showmore'>
				<a className='show' onClick={handleShow} href='javascript:;'>
					Show more
				</a>
			</div>
		</div>
		</React.Fragment>
	);
}
