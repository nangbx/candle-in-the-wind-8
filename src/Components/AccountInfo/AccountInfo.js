import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./AccountInfo.scss";
import Orders from "./Orders";
import Account from "./Account";
import { useDispatch } from "react-redux";
import { actChangePasswordRequest } from "../../Redux/Actions";
import ScrollToTop from "react-scroll-to-top";
import BreadcrumbMenu from "../Small/BreadcrumbMenu";
import OrderDetail from "./OrderDetail";

export default function AccountInfo() {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const [data, setData] = React.useState({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: ""
	})
	const [error, setError] = React.useState({
		oldPass:{
			state: false,
			mess: ''
		},
		newPass:{
			state: false,
			mess: ''
		},
		confirmPass:{
			state: false,
			mess: ''
		}
	})
	const handleClose = () => {
		setOpen(false)
		setData({})
	};
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    const handleSubmit = () => {
		var bool = false;
        if(!(/^(?!\s*$).+/.test(data.currentPassword))){
			setError(prev => ({
				...prev,
				oldPass: {
					state: true,
					mess: 'Mật khẩu không hợp lệ'
				}
			}));
			bool = true;
		}
		if(!(/^[A-Za-z]\w{7,14}$/.test(data.newPassword))){
			setError(prev => ({
				...prev,
				newPass: {
					state: true,
					mess: 'Mật khẩu không hợp lệ'
				}
			}));
			bool = true;
		}
		if(data.newPassword !== data.confirmNewPassword){
			setError(prev => ({
				...prev,
				confirmPass: {
					state: true,
					mess: 'Mật khẩu không hợp lệ'
				}
			}));
			bool = true;
		}
		if(!bool){
			dispatch(actChangePasswordRequest(data))
			setOpen(false)
			setData({})
		}
    }
	const [isActive, setIsActive] = useState({
		Orders: true,
		Detail: false,
		ChangePass: false,
		Noti: false,
		Logout: false,
		OrderDetail: false
	});
	const handleMenu = (e) => {
		setIsActive((prev) => {
			prev = {
				Orders: false,
				Detail: false,
				ChangePass: false,
				Noti: false,
				Logout: false,
				OrderDetail: false
			};
			prev[e.target.name] = true;
			return prev;
		});
	};
	const handleChangePass = () => {
		setOpen(true)
	};
	const handleChangeInput = (e) => {
		handleBlurInput(e);
		setData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}
	const handleBlurInput = (e) => {
		setError(prev => ({
			...prev,
			[e.target.id]: {
				state: false,
				mess: ''
			}
		}))
	};
	var url = [
		{
			name: 'Home',
			path: '/'
		}
	]
	const [id, setID] = useState(1);
	return (
		<div>
		<ScrollToTop smooth />
		<BreadcrumbMenu url = {url} destination="Quản lý tài khoản"/>
			<div class='account'>
				<div class='account-body'>
					<div class='menu'>
						<a
							href={() => false}
							name='Orders'
							onClick={handleMenu}
							className={isActive.Orders ? "active" : null}
						>
							Orders
						</a>
						<a
							href={() => false}
							name='Detail'
							onClick={handleMenu}
							className={isActive.Detail ? "active" : null}
						>
							Account Detail{" "}
						</a>
						<a
							href={() => false}
							name='ChangePass'
							onClick={handleChangePass}
							className={isActive.ChangePass ? "active" : null}
						>
							Đổi mật khẩu
						</a>
					</div>
					<div className='content'>
						{isActive.Orders ? <Orders set={setIsActive} setID = {setID} /> : null}
						{isActive.Detail ? <Account /> : null}
						{isActive.OrderDetail ? <OrderDetail set={setIsActive} id={id}/> : null}
					</div>
				</div>
			</div>
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				disableScrollLock
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Đổi mật khẩu</DialogTitle>
				<DialogContent>
					<TextField
						error = {error.oldPass.state}
						helperText = {error.oldPass.mess}
						autoFocus
						margin='dense'
						id='oldPass'
						label='Mật khẩu cũ'
						fullWidth
						type="password"
						variant='standard'
						value={data.currentPassword}
						name="currentPassword"
						onChange={handleChangeInput}
						
					/>
					<TextField
						error = {error.newPass.state}
						helperText = {error.newPass.mess}
						id='newPass'
						label='Mật khẩu mới'
						fullWidth
						type="password"
						variant='standard'
						value={data.newPassword}
						name="newPassword"
						onChange={handleChangeInput}
					/>
					<TextField
						error = {error.confirmPass.state}
						helperText = {error.confirmPass.mess}
						id='confirmPass'
						label='Nhập lại mật khẩu mới'
						fullWidth
						type="password"
						variant='standard'
						value={data.confirmNewPassword}
						name="confirmNewPassword"
						onChange={handleChangeInput}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Đổi mật khẩu</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
