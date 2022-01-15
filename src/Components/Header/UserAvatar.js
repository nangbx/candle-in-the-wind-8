import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import BookIcon from "@mui/icons-material/Book";
import { logout } from "../../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { actFetchGetProfile } from "../../Redux/Actions";
import { openDialog } from "../../Redux/Actions/Dialog";
import { notifySuccess } from "../../Redux/Actions/Notify";
import { actFetchCart } from "../../Redux/Actions/Cart";
export default function UserAvatar() {
	const { user, trang_thai } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	let navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [openLogout, setOpenLogout] = React.useState(false);

	const handleClickOpen = () => {
		setOpenLogout(true);
	};

	const handleCloseLogout = (value) => {
		setOpenLogout(false);
		if (value === true) {
			dispatch(logout());
			localStorage.removeItem("accessToken");
			navigate("/");
			dispatch(
				actFetchCart({
					products: [],
					productCount: 0,
					totalPrice: 0,
				})
			);
			dispatch(notifySuccess("Đăng xuất thành công"));
		}
	};
	useEffect(() => {
		dispatch(actFetchGetProfile());
	}, [dispatch]);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleDialog = () => {
		dispatch(openDialog());
	};
	const handleLogout = () => {
		setOpenLogout(true);
	};
	const handleAccount = () => {
		navigate("/account");
	};
	return (
		<div>
			<IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
				<Avatar sx={{ width: 32, height: 32 }}></Avatar>
			</IconButton>
			<Menu
				disableScrollLock
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem onClick={handleAccount}>
					<Avatar /> {user.userName}
				</MenuItem>

				<MenuItem onClick={handleDialog}>
					<ListItemIcon>
						<BookIcon fontSize='small' />
					</ListItemIcon>
					Tạo bài viết
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Đăng xuất
				</MenuItem>
			</Menu>
			<Dialog
				disableScrollLock
				open={openLogout}
				onClose={handleCloseLogout}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{"Bạn có muốn đăng xuất?"}
				</DialogTitle>
				<DialogActions>
					<Button onClick={(e) => handleCloseLogout(false)}>Quay lại</Button>
					<Button onClick={(e) => handleCloseLogout(true)} autoFocus>
						Đăng xuất
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
