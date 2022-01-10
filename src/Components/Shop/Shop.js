import React, { useEffect, useState } from "react";
import ProductItem from "../Products/ProductItem";
import { API_URL } from "../../const";
import BreadcrumbMenu from "../Small/BreadcrumbMenu";
import "./Shop.scss"
export default function Shop() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		fetch(`${API_URL}/api/Products`)
			.then((res) => res.json())
			.then((products) => setProducts(products));
	}, []);
	var url = [
		{
			name: 'Home',
			path: '/'
		}
	]
	return (
		<React.Fragment>
			<BreadcrumbMenu url = {url} destination='Danh sách sản phẩm'/>
			<div className='shop'>
			<div className='product'>
				{products.map((item) => (
					<ProductItem key={item.id} data={item} />
				))}
			</div>
		</div>
		</React.Fragment>
	);
}
