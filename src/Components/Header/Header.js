import "./Header.scss";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	TextField,
	InputAdornment,
	SvgIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import AvatarUser from "./UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { actFetchCartRequest } from "../../Redux/Actions/Cart";
import { API_URL } from "../../const";
import CartButton from "../Small/CartButton";
import { useNavigate } from 'react-router-dom';
import Notification from "../Small/Notification";
export default function Header() {
	const { user, trang_thai } = useSelector((state) => state.users);
	const [categories, setCategories] = useState([]);
	let navigate = useNavigate();
	const [key, setKey] = useState('')
	const dispatch = useDispatch();
	useEffect(() => {
		fetch(`${API_URL}/api/Categories`)
			.then((res) => res.json())
			.then((data) => setCategories(data));
	}, []);
	useEffect(() => {
		if (trang_thai) {
			dispatch(actFetchCartRequest());
		}
	}, [trang_thai]);
	const handleSearch = (e) => {
		if(e.code === "Enter"){
			navigate(`/product/${key}`)
			setKey('')
		}
	}
	return (
		<header className="header-shop">
			<div className='background' />
			<div className='text'>
				<Link to='/'>
					<h1>CandleInTheWind</h1>
				</Link>
				<ul>
					<li className='dropdown'>
						<a className='nut_dropdown'>Hạng mục</a>
						<div className='noidung_dropdown'>
							{categories.map((item) => (
								<Link to={`category/${item.id}`} key={item.id}>
									{item.name}
								</Link>
							))}
						</div>
					</li>
					<li>
						<Link to='/forum'>Forum</Link>
					</li>
					<li>
						<Link to='/shop'>Shop</Link>
					</li>
				</ul>
				<TextField
					
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SvgIcon color='action' fontSize='small'>
									<SearchIcon />
								</SvgIcon>
							</InputAdornment>
						),
					}}
					placeholder='Tìm kiếm sản phẩm'
					variant='outlined'
					onKeyUp={handleSearch}
					value={key}
					onChange={e => setKey(e.target.value)}
				/>
				<ul>
					<li>
						<CartButton />
					</li>
					<li>
						<Notification />
					</li>
					<li>
						{trang_thai ? (
							<AvatarUser avatar={user.avatar} username={user.username} />
						) : (
							<Link to='/signin'>
								<Avatar></Avatar>
							</Link>
						)}
					</li>
				</ul>
			</div>
		</header>
	);
}
