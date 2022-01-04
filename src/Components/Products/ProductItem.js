import React from "react";
import "./ProductItem.scss";
import { green, pink, blue } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../const"
export default function ProductItem({ data }) {
	const { categoryId, categoryName, description, id, imageUrl, name, price, stock } = data;
	return (
		<div className='ProductItem'>
			<div className='box'>
				{/*img-box--------*/}
				<div className='slide-img'>
					<img src={`${IMG_URL}${imageUrl}`} alt={1} />
					{/*overlayer--------*/}
					<div className='overlay'>
						{/*buy-btn----*/}
						<Stack direction='row' spacing={4}>
							<Avatar sx={{ bgcolor: blue[50] }}>
								<ShoppingCartIcon sx={{ color: pink[500] }} />
							</Avatar>
							<Link to={`/products/${id}`}>
								<Avatar sx={{ bgcolor: blue[50] }}>
									<SearchIcon sx={{ color: pink[500] }} />
								</Avatar>
							</Link>
						</Stack>
					</div>
				</div>
				{/*detail-box-------*/}
			</div>
		</div>
	);
}
