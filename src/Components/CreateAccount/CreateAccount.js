import { Link } from "react-router-dom";
import "./CreateAccount.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { API_URL } from "../../const";
import { notifySuccess, notifyError } from "../../Redux/Actions/Notify";

export default function CreateAccount() {
	const dispatch = useDispatch();
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
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
		password: {
			state: false,
			mess: "",
		},
		comfirmPassword: {
			state: false,
			mess: "",
		},
	});
	const [data, setData] = useState({
		userName: "",
		email: "",
		sex: "female",
		date: new Date().toISOString().substring(0, 10),
		phone: "",
		password: "",
		comfirmPassword: "",
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
	const handleRegister = (e) => {
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
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
			setError((prev) => ({
				...prev,
				email: {
					state: true,
					mess: "Địa chỉ email không hợp lệ",
				},
			}));
			bool = true;
		}
		if (!/^\d{10}$/.test(data.phone)) {
			setError((prev) => ({
				...prev,
				phone: {
					state: true,
					mess: "Số điện thoại không hợp lệ",
				},
			}));
			bool = true;
		}
		if (!/^[A-Za-z]\w{7,14}$/.test(data.password)) {
			setError((prev) => ({
				...prev,
				password: {
					state: true,
					mess: "Mật khẩu không hợp lệ",
				},
			}));
			bool = true;
		}
		if (data.comfirmPassword !== data.password) {
			setError((prev) => ({
				...prev,
				comfirmPassword: {
					state: true,
					mess: "Mật khẩu không hợp lệ",
				},
			}));
			bool = true;
		}
		if (bool === false) {
			const body = {
				userName: data.userName,
				email: data.email,
				phoneNumber: data.phone,
				password: data.password,
				confirmPassword: data.comfirmPassword,
				dateOfBirth: data.date,
				gender: data.sex === "Nam" ? 1 : data.sex === "Nữ" ? 2 : 0,
			};
			var bool = true;
			fetch(`${API_URL}/api/Accounts/SignUp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((mess) => {
					if (!mess.success) {
						dispatch(notifyError(mess.error));
					} else {
						dispatch(notifySuccess("Đăng ký thành công"));
					}
				});
		}
	};

	return (
		<div className='create'>
			<div className='create-img'></div>
			<div className='create-form'>
				<img src='./img/Group 21.svg' alt='' />
				<div className='create-form-input'>
					<h1>Create Account</h1>
					<Box
						onSubmit={handleRegister}
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

								<FormControlLabel
									value='Khác'
									control={<Radio />}
									label='Khác'
								/>
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
								data.date
									? data.date
									: new Date().toISOString().substring(0, 10)
							}
						/>
						<br />
						<TextField
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
							fullWidth
							error={error.password.state}
							id='standard-error-helper-text'
							label='Mật khẩu'
							helperText={error.password.mess}
							variant='standard'
							name='password'
							type={"password"}
							onChange={handleOnChangeInput}
							value={data.password}
						/>
						<TextField
							fullWidth
							error={error.comfirmPassword.state}
							id='standard-error-helper-text'
							label='Mật khẩu'
							helperText={error.comfirmPassword.mess}
							variant='standard'
							name='comfirmPassword'
							type={"password"}
							onChange={handleOnChangeInput}
							value={data.comfirmPassword}
						/>
						<a href={void 0} onClick={handleRegister}>
							Tạo tài khoản
						</a>
					</Box>
					<p className='login'>
						Bạn đã có tài khoản? <Link to='/signin'>Đăng nhập</Link>
					</p>
				</div>
				<img src='./img/Group 21.svg' alt='' />
			</div>
		</div>
	);
}
