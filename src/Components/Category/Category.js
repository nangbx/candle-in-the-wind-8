import { useEffect, useState } from "react";
import ProductItem from "../Products/ProductItem";
import "./Category.scss";
import { API_URL } from "../../const";
import {useParams} from "react-router-dom"

export default function Products() {
    const {id} = useParams();
	const [products, setProducts] = useState([]);
    const [name, setName] = useState("")
	useEffect(() => {
        fetch(`${API_URL}/api/Categories/${id}`)
            .then(res => res.json())
            .then(category => setName(category.name))
		fetch(`${API_URL}/api/Products/Category?categoryId=${id}`)
			.then((res) => res.json())
			.then((products) => setProducts(products.products));
	}, [id]);

	const handleShow = () => {
		
	};
	return (
		<div className="category">
            <h1>{name}</h1>
			<div className='category-list'>
				{products.map((item) => (
					<ProductItem key={item.id} data={item} />
				))}
			</div>
			<div className='showmore'>
				<a href="true" className='show' onClick={handleShow} >
					Show more
				</a>
			</div>
		</div>
	);
}
