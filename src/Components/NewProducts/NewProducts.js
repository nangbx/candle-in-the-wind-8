import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, IMG_URL } from "../../Redux/Constants/Config";
import "./NewProducts.scss";
export default function NewProducts() {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "./app2.js";
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);
	return (
		<React.Fragment>
			<div className='newProducts'>
				<div className='title'>
					<h3>Hãy đến với CandleInTheWind</h3>
					<p>để có những sản phẩm tốt nhất</p>
					<Link to={"/shop"}>
						<button>Xem thêm các sản phẩm khác</button>
					</Link>
				</div>
				<div className='products-top'>
					<div className='products-top__item'>
						<Link to={`/products/18`}>
							<img src='./img/1.jpg' alt='' />
						</Link>
					</div>

					<div className='products-top__item'>
						<Link to={`/products/8`}>
							<img src='./img/2.jpg' alt='' />
						</Link>
					</div>

					<div className='products-top__item'>
						<Link to={`/products/12`}>
							<img src='./img/3.jpg' alt='' />
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
