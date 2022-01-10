import React from "react";
import './Feature.scss';

export default function Feature() {
	return (
		<div className='feature'>
			<div className='feature-item'>
				<div className='left'>
					<img src='./img/Vector.png' alt='' />
				</div>
				<div className='right'>
					<h4>Chất lượng</h4>
					<p>được đặt lên hàng đầu</p>
				</div>
			</div>
			<div className='feature-item'>
				<div className='left'>
					<img src='./img/guarantee.png' alt='' />
				</div>
				<div className='right'>
					<h4>Uy tín</h4>
					<p>đã được kiểm chứng</p>
				</div>
			</div>
			<div className='feature-item'>
				<div className='left'>
					<img src='./img/shipping.png' alt='' />
				</div>
				<div className='right'>
					<h4>Free ship</h4>
					<p>với các đơn giá trên 1tr</p>
				</div>
			</div>
			<div className='feature-item'>
				<div className='left'>
					<img src='./img/Vector (1).png' alt='' />
				</div>
				<div className='right'>
					<h4>Tư vấn</h4>
					<p>24/7</p>
				</div>
			</div>
		</div>
	);
}
