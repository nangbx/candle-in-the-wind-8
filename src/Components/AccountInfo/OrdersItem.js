import React from "react";
import "./OrderItem.scss"
export default function OrdersItem() {
	return (
		<div className='orders-item'>
			<h3>Đã giao</h3>
			<div className='draw' />
			<div className='orders-info'>
				<div className='left'>
					<img src="./img/cart-1.svg" alt='' />
					<div className="text">
                        <p>Tên sản phẩm</p>
                        <p>Số lượng</p>
                    </div>
				</div>
				<div className='right'>
					<p>Giá: 12324234</p>
				</div>
			</div>
		</div>
	);
}
