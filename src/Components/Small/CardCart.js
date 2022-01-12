import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Slider from '@mui/material/Slider';
import { notifySuccess } from "../../Redux/Actions/Notify";
import { actFetchCartRequest } from "../../Redux/Actions/Cart"
import { actFetchGetProfile } from "../../Redux/Actions";
import { API_URL } from "../../const";
import "./CardCart.scss";

export default function CardCart({ totalPrice, voucher, value, setValue }) {
	const navigate = useNavigate();
	const { user, trang_thai } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const handlePoints = (event, value) => {
		setValue(value)
	}
	const handleCheckout = () => {
		if(voucher.value === 0){
			fetch(`${API_URL}/api/Orders/CreateOrder?points=${value}`,{
					method: 'POST',
					headers:{
						Authorization: "Bearer " + `${localStorage.getItem("accessToken")}`
					}
			})
				.then(res => res.json())
				.then(mess => {
					dispatch(notifySuccess(mess.message))
					dispatch(actFetchCartRequest())
					navigate('/')
					dispatch(actFetchGetProfile())
				})
		}
		if(voucher.value !== 0){
			fetch(`${API_URL}/api/Orders/CreateOrder?voucherId=${voucher.id}`,{
					method: 'POST',
					headers:{
						Authorization: "Bearer " + `${localStorage.getItem("accessToken")}`
					}
			})
				.then(res => res.json())
				.then(mess => {
					dispatch(notifySuccess(mess.message))
					dispatch(actFetchCartRequest())
					navigate('/')
					dispatch(actFetchGetProfile())
				})
		}	
	}
	return (
		<div>
			<Card sx={{ minWidth: 400, marginLeft: 2 }}>
				<CardContent>
					<h2>Cart total</h2>
					<div className='price'>
						<div className='name'>
							<p>Total products</p>
						</div>
						<div className='number'>
							<p>{totalPrice} VND</p>
						</div>
					</div>
					<div className='price'>
						<div className='name'>
							<p>Giảm giá</p>
						</div>
						<div className='number'>
							<p>{voucher.value}%</p>
						</div>
					</div>
					<div className='price'>
						<div className='name'>
							<p>Sử dụng điểm:</p>
						</div>
						<div className='number'>
							<Slider
								disabled = {voucher.value === 0 ? false : true}
								sx={{ width: 200}}
								size='small'
								defaultValue={0}
								aria-label='Small'
								valueLabelDisplay='auto'
								value={value|| 0}
								max={user.points >= (voucher.value !== 0 ? (totalPrice * voucher.value) / 100 : totalPrice) ? (voucher.value !== 0 ? (totalPrice * voucher.value) / 100 : totalPrice) : user.points}
								onChange={handlePoints}
							/>
							<p>{value}</p>
						</div>
					</div>
					<hr />
					<div className='price'>
						<div className='name'>
							<h3>Tổng:</h3>
						</div>
						<div className='number'>
							<p>{voucher.value !== 0 ? totalPrice -  (totalPrice * voucher.value) / 100 : (totalPrice - value)} VND</p>
						</div>
					</div>
				</CardContent>
				<CardActions>
					<Button variant='contained' disableElevation onClick={handleCheckout}>
						Checkout
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
