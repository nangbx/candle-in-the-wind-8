import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./Login.scss";
import { loginUser } from "../../Redux/Actions";
import reducer from "../../Redux/Reducers";
import {notifySuccess, notifyWarning} from "../../Redux/Actions/Notify"
import {API_URL} from "../../const";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
export default function Login() {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0)
    }, [])
  const LoginUsers = (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = {
      email: formData.email,
      password: formData.password
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(
      `${API_URL}/api/Accounts/SignIn`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          localStorage.setItem("accessToken", result.accessToken);
          dispatch(notifySuccess('Đăng nhập thành công'))
          dispatch(loginUser())
          navigate("/");
        } else {
          dispatch(notifyWarning('Đăng nhập thất bại'))
        }
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var bool = false;
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
    if (!/.*\S.*/.test(data.password)) {
			setError((prev) => ({
				...prev,
				password: {
					state: true,
					mess: "Mật khẩu không hợp lệ",
				},
			}));
			bool = true;
		}
    if(!bool){
      await LoginUsers(data);
    }
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
		email: {
			state: false,
			mess: "",
		},
		password: {
			state: false,
			mess: "",
		}
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
  }

  return (
    <div className="login">
      <div className="login-img"></div>
      <div className="login-form">
        <img src="./img/Group 21.svg" alt="" />
        <div className="login-form-input">
          <h1>Đăng nhập</h1>
          <Box
						onSubmit={handleSubmit}
						component='form'
						sx={{
							"& > :not(style)": { m: 1 },
						}}
						noValidate
						autoComplete='off'
					>
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
						<button id="submit" type="submit">Đăng nhập</button>
					</Box>
          {/* <form onSubmit={handleSubmit}>
            <label htmlFor>Email</label>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleOnChangeInput}
            />
            <label htmlFor>Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleOnChangeInput}
            />
            <button type="submit">Login</button>
          </form> */}
          <p className="createAccount">
            Bạn chưa có tài khoản? <Link to="/signup">Tạo tài khoản</Link>
          </p>
        </div>
        <img src="./img/Group 21.svg" alt="" />
      </div>
    </div>
  );
}
