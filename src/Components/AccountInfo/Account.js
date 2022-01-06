import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Account.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { actUpdateProfileRequest } from "../../Redux/Actions";

export default function Account() {
	const dispatch = useDispatch();
	const { user, trang_thai } = useSelector((state) => state.users);
	const [error, setError] = useState({
		userName: {
			state: false,
			mess: "",
		},
		email: {
			state: false,
			mess: "",
		},
		phone: {
			state: false,
			mess: "",
		},
		point:{
			state: false,
			mess: ""
		}
	});
	
	const [data, setData] = useState({
		userName: user.userName,
		email: user.email,
		sex: user.genderName,
		date: new Date(user.dateOfBirth.substring(0, 10)).toISOString().substring(0, 10),
		phone: user.phoneNumber,
		point: user.points
	});
	const handleOnChangeInput = (e) => {
		setError((prev) => ({
			...prev,
			[e.target.name]: {
				state: false,
				mess: "",
			},
		}));
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleChange = (e) => {
		var bool = false;
		if (!/^(?!\s*$).+/.test(data.userName)) {
			setError((prev) => ({
				...prev,
				userName: {
					state: true,
					mess: "Bạn chưa nhập tên người dùng",
				},
			}));
			bool = true;
		}
		if (bool === false) {
			const body = {
				userName: data.userName,
				phoneNumber: data.phone,
				dateOfBirth: data.date,
				gender: data.sex === "Nam" ? 1 : (data.sex === "Nữ" ? 0 : 2),
			};
			dispatch(actUpdateProfileRequest(body))
		}
	};

	return (
		<div className='account-info'>
			<h3>Hồ sơ của tôi</h3>
			<p>Quản lý thông tin hồ sơ</p>
			<hr />
			<Box
				component='form'
				sx={{
					"& > :not(style)": { m: 1 },
				}}
				noValidate
				autoComplete='off'
			>
				<TextField
					fullWidth
					error={error.userName.state}
					id='standard-error-helper-text'
					label='Họ và tên'
					helperText={error.userName.mess}
					variant='standard'
					name='userName'
					onChange={handleOnChangeInput}
					value={data.userName}
				/>
				<TextField
					disabled
					fullWidth
					error={error.email.state}
					id='standard-error-helper-text'
					label='Email'
					helperText={error.email.mess}
					variant='standard'
					name='email'
					onChange={handleOnChangeInput}
					value={data.email}
				/>
				<label htmlFor>Giới tính</label>
				<br />
				<div className='sex'>
					<RadioGroup
						row
						aria-label='gender'
						name='sex'
						value={data.sex}
						onChange={handleOnChangeInput}
					>
						<FormControlLabel value='Nam' control={<Radio />} label='Nam' />
						<FormControlLabel value='Nữ' control={<Radio />} label='Nữ' />
						<FormControlLabel value='Khác' control={<Radio />} label='Khác' />
					</RadioGroup>
				</div>
				<label htmlFor>Ngày sinh</label>
				<br />
				<input
					type='date'
					name='date'
					id
					onChange={handleOnChangeInput}
					value={
						data.date ? data.date : new Date().toISOString().substring(0, 10)
					}
				/>
				<br />
				<TextField
					disabled
					fullWidth
					error={error.phone.state}
					id='standard-error-helper-text'
					label='Số điện thoại'
					helperText={error.phone.mess}
					variant='standard'
					name='phone'
					onChange={handleOnChangeInput}
					value={data.phone}
				/>
				<TextField
					disabled
					fullWidth
					error={error.phone.state}
					id='standard-error-helper-text'
					label='Số điểm'
					helperText={error.phone.mess}
					variant='standard'
					name='point'
					onChange={handleOnChangeInput}
					value={data.point}
				/>

				<a href={void(0)} onClick={handleChange}>Lưu</a>
			</Box>
		</div>
	);
}
