import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NewProducts.scss";
export default function NewProducts() {
	useEffect(() => {
		const script = document.createElement("script");

		script.src = "/app.js";
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
					<Link to={'/shop'}><button>Xem thêm các sản phẩm khác</button></Link>
				</div>
				<div className='products-top'>
					<div className='products-top__item'>
						<img src='./img/Rectangle 24.png' alt='' />
					</div>
					<div className='products-top__item'>
						<img src='./img/Rectangle 24.png' alt='' />
					</div>
					<div className='products-top__item'>
						<img src='./img/Rectangle 24.png' alt='' />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
