import React from "react";
import "./ProductItem.scss";
import { pink, blue } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../const";
import { actAddProductRequest } from "../../Redux/Actions/Cart";
import { useDispatch } from "react-redux";
import { notifyWarning } from "../../Redux/Actions/Notify";

export default function ProductItem({ data }) {
	const {
		id,
		imageUrl,
		stock
	} = data;
	const dispatch = useDispatch();
	const handleAddToCard = () => {
		if(stock !== 0){
			dispatch(
				actAddProductRequest({
					id: id,
					count: 1,
				})
			);
		} else{
			dispatch(notifyWarning('Sản phẩm hiện đã hết. Vui lòng quay lại sau'))
		}
	};
	
	return (
		<React.Fragment>
			<div className='ProductItem'>
				<div className='box'>
					{/*img-box--------*/}
					<div className='slide-img'>
						<img src={`${IMG_URL}${imageUrl}`} alt={1} />
						{/*overlayer--------*/}
						<div className='overlay'>
							{/*buy-btn----*/}
							<Stack direction='row' spacing={4}>
								<Avatar
									onClick={handleAddToCard}
									sx={{ bgcolor: blue[50], cursor: "pointer" }}
								>
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
		</React.Fragment>
	);
}
