import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./Login.scss";
import { loginUser } from "../../Redux/Actions";
import reducer from "../../Redux/Reducers";
import {notifySuccess, notifyWarning} from "../../Redux/Actions/Notify"
import {API_URL} from "../../const"
export default function Login() {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const handleOnChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
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
    if (!data.password || !data.email) {
      return null;
    } else {
      await LoginUsers(data);
    }
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="login">
      <div className="login-img"></div>
      <div className="login-form">
        <img src="./img/Group 21.svg" alt="" />
        <div className="login-form-input">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
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
          </form>
          <p>
            Bạn chưa có tài khoản? <Link to="/signup">Create account</Link>
          </p>
        </div>
        <img src="./img/Group 21.svg" alt="" />
      </div>
    </div>
  );
}
