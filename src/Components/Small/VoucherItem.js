import React from "react";
import "./VoucherItem.scss";
export default function VoucherItem({voucher}) {
	return (
		<div className='voucher'>
			<div className='color' />
			<div className='info'>
				<h3>{voucher.name}</h3>
				<div className='border' />
				<p>Giá trị: {voucher.value}%</p>
                <p>Hạn sử dụng: {voucher.expired ? voucher.expired.substring(0, 10) : ''}</p>
				<p>Điểm: {voucher.points}</p>
			</div>
		</div>
	);
}
