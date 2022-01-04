import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { notifyWarning } from "../../Redux/Actions/Notify";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}));
export default function CartButton() {
    const { user, trang_thai } = useSelector((state) => state.users);
    const [state, setState] = useState(trang_thai)
    useEffect(() => {
        //dispatch(setCarts({}))
    }, [trang_thai])
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const product = useSelector(state => state.cart)
    const handleClick = (e) => {
		if (trang_thai) {
			if(product.productCount === 0){
				dispatch(notifyWarning("Không có sản phẩm nào trong giỏ hàng!"))
			} else{
				navigate("/cart")
			}
			
		}
		else {
			dispatch(notifyWarning("Bạn chưa đăng nhập!"))
		};
	};
	return (
		<IconButton onClick={handleClick} aria-label='cart'>
			<StyledBadge badgeContent={product.productCount} color='secondary'>
				<ShoppingCartIcon />
			</StyledBadge>
		</IconButton>
	);
}
