import React, { useEffect, useState } from "react";
import { API_URL, IMG_URL } from "../../const";
import CartItem from "../Cart/CartItem";
import QtyCart from "../Small/QtyCart";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SeverityPill } from "./SeverityPill";
import "./OrderDetail.scss";
export default function OrderDetail({ id }) {
	const [order, setOrder] = useState();
	useEffect(() => {
		fetch(`${API_URL}/api/Orders/MyOrders/${id}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setOrder(data));
	}, [id]);
	const handleDelete = () => {};
	return (
		<div className='order-detail'>
			<h2>Chi tiết đơn hàng</h2>
			<div className='info'>
				<div className='row'>
					<span id='name'>ID:</span>
					<span>{order ? order.id : "Không có"}</span>
				</div>
				<div className='row'>
					<span id='name'>Voucher:</span>
					<span>
						{order
							? order.voucherValue
								? order.voucherValue
								: "Không có"
							: ""}
					</span>
				</div>
				<div className='row'>
					<span id='name'>Ngày mua:</span>
					<span>{order ? order.purchaseDate.substring(0, 10) : ""}</span>
				</div>
                <div className='row'>
					<span id='name'>Giá trị đơn hàng:</span>
					<span>{order ? order.total : ""} VND</span>
				</div>
				<div className='row'>
					<span id='name'>Trạng thái:</span>
					{order ? <SeverityPill
						color={
							(order.status === 1 && "success") ||
							(order.status === 3 && "error") ||
							"warning"
						}
					>
						{order.statusName}
					</SeverityPill> : ''}
				</div>
			</div>
			<table>
				<thead>
					<th>Hình ảnh</th>
					<th>Tên sản phẩm</th>
					<th>Đơn giá</th>
					<th>Số lượng</th>
				</thead>
				<tbody>
					{order
						? order.products.map((item) => (
								<tr className='cart-item'>
									<td>
										<img src={`${IMG_URL}${item.imageUrl}`} />
									</td>
									<td>{item.name}</td>
									<td>{item.unitPrice} VND</td>
									<td>{item.quantity}</td>
								</tr>
						  ))
						: ""}
				</tbody>
			</table>
		</div>
	);
}
