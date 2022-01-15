import { useState, useEffect } from "react";
import React from "react"
import "./Cart.scss";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import CardCart from "../Small/CardCart";
import Voucher from "../Small/Voucher";
import CartItem from "./CartItem";
import BreadcrumbMenu from "../Small/BreadcrumbMenu"

export default function Cart() {
	const { products, totalPrice } = useSelector(state => state.cart)
	const [voucher, setVoucher] = useState({
		value: 0,
		id: null
	})
	const [point, setPoint] = useState(0)
	const [list, setList] = useState([]) 
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
	useEffect(() => {
		setList(products)
	}, [products]);
	var url = [
		{
			name: 'Home',
			path: '/'
		}
	]
	return (
		<React.Fragment>
			<BreadcrumbMenu url = {url} destination="Giỏ hàng"/>
			<div>
				<div class='cart'>
					<table>
						<thead>
							<th>Hình ảnh</th>
							<th>Tên sản phẩm</th>
							<th>Đơn giá</th>
							<th>Số lượng</th>
							<th>Thành tiền</th>
							<th>Xóa</th>
						</thead>
						<tbody>
							{list.map(item => (
								<CartItem data={item}/>
							))}
						</tbody>
					</table>
					<div className='continue'>
						<Link to="/">Tiếp tục mua sắm</Link>
					</div>
					<div className='footer'></div>
					<div className='card'>
						<Voucher setVoucher = {setVoucher} point={point}/>
						<CardCart totalPrice = {totalPrice} voucher={voucher} value={point} setValue={setPoint}/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
