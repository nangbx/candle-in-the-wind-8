import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.scss";
import InputNumber from "../Small/InputNumber";
import { API_URL, IMG_URL } from "../../const";
import { useSelector, useDispatch } from "react-redux";
import { notifyWarning } from "../../Redux/Actions/Notify";
import { actAddProductRequest } from "../../Redux/Actions/Cart";
import BreadcrumbMenu from "../Small/BreadcrumbMenu";
export default function ProductDetail() {
	const { user, trang_thai } = useSelector((state) => state.users);
	const qty = { count: 1 };
	const dispatch = useDispatch();
	const { id } = useParams();
	let navigate = useNavigate();
	const [item, setItem] = useState({});
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		fetch(`${API_URL}/api/Products/${id}`)
			.then((res) => res.json())
			.then((item) => setItem(item));
	}, item);
	const handleBack = () => {
		navigate(-1);
	};
	const handleClick = () => {
		if (!trang_thai) dispatch(notifyWarning("Bạn chưa đăng nhập"));
		else if(item.stock === 0){
			dispatch(notifyWarning('Sản phẩm hiện đã hết. Vui lòng quay lại sau'))
		}
		else {
			dispatch(
				actAddProductRequest({
					id: id,
					count: qty.count,
				})
			);
		}
	};
  const url = [
		{
			name: 'Home',
			path: '/'
		}
	]
	return (
		<React.Fragment>
    <BreadcrumbMenu url={url} destination='Chi tiết sản phẩm' />
			<div className='detail'>
				<div className='image'>
					<div className='wrapImage'>
						<img src={`${IMG_URL}${item.imageUrl}`} alt='' />
						<div className='miniImage'>
							<img src={`${IMG_URL}${item.imageUrl}`} alt='' />
							<img src={`${IMG_URL}${item.imageUrl}`} alt='' />
							<img src={`${IMG_URL}${item.imageUrl}`} alt='' />
						</div>
					</div>
				</div>
				<div className='info'>
					<a onClick={handleBack}>
						<i className='fas fa-arrow-left' />
						Quay lại
					</a>
					{item.stock === 0 ? (
						<span className="stockNone">Hết hàng</span>
					) : ''}
					<h1>{item.name}</h1>
					<h2>{item.write}</h2>
					<p>{item.description}</p>
					<hr />
					<br />
					<div className="position-qty">
						<p className="qty">Số lượng:</p>
						<InputNumber quantily={qty} max={item.stock} />
					</div>
					<h3>Giá: {item.price} VND</h3>
					<button className='add' onClick={handleClick}>
						THÊM VÀO GIỎ HÀNG
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
