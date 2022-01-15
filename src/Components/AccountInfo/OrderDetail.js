import React, { useEffect, useState } from "react";
import { API_URL, IMG_URL } from "../../const";
import { SeverityPill } from "./SeverityPill";
import "./OrderDetail.scss";
export default function OrderDetail({ set, id }) {
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
	const formatDay = (date) => {
		const obj = new Date(date);
		const month = String(obj.getMonth() + 1).padStart(2, "0");
		const day = String(obj.getDate()).padStart(2, "0");
		const year = obj.getFullYear();
		return day + "/" + month + "/" + year;
	};
	const handleBack = () => {
		set((prev) => {
			prev = {
				Orders: false,
				Detail: false,
				ChangePass: false,
				Noti: false,
				Logout: false,
				OrderDetail: false
			};
			prev.Orders = true;
			return prev;
		});
	};
	return (
		<React.Fragment>
			<div className='order-detail'>
				<a onClick={handleBack} className='back'>
					<i className='fas fa-arrow-left' />
					Quay lại
				</a>
				<h2 className="header">Chi tiết đơn hàng</h2>
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
									? order.voucherValue + "%"
									: "Không có"
								: ""}
						</span>
					</div>
					<div className='row'>
						<span id='name'>Ngày mua:</span>
						<span>
							{order ? formatDay(order.purchaseDate.substring(0, 10)) : ""}
						</span>
					</div>
					<div className='row'>
						<span id='name'>Giá trị đơn hàng:</span>
						<span>{order ? order.total : ""} VND</span>
					</div>
					<div className='row'>
						<span id='name'>Trạng thái:</span>
						{order ? (
							<SeverityPill
								color={
									(order.status === 1 && "success") ||
									(order.status === 3 && "error") ||
									"warning"
								}
							>
								{order.statusName}
							</SeverityPill>
						) : (
							""
						)}
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
		</React.Fragment>
	);
}
