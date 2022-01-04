import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { actFetchDeleteComment } from "../../Redux/Actions/Comment";
export default function EditButton({ id, setState, postID, commentID, check }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
	const open = Boolean(anchorEl);
	const { user, trang_thai } = useSelector((state) => state.users);
    const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClick = (e) => {
        console.log(id)
		if (user.id === id) {
            setAnchorEl(e.currentTarget)
		}
	};
    const handleEdit = () => {
       
        if(user.id === id){
            setState({
                state: true
            })
        }
    }
    const handleDelete = () => {
        dispatch(actFetchDeleteComment(postID, commentID))
    }
	return (
		<div>
			<IconButton aria-label='Example' onClick={handleClick}>
				<i class='fas fa-ellipsis-v'></i>
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
						mt: 0,
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
				<MenuItem disabled= {!check} onClick={handleEdit}>
					<ListItemIcon>
						<EditIcon fontSize='small' />
					</ListItemIcon>
					Sửa bình luận
				</MenuItem>
				<Divider />
				<MenuItem disabled= {!check} onClick={handleDelete}>
					<ListItemIcon>
						<BookmarkRemoveIcon fontSize='small' />
					</ListItemIcon>
					Xóa bình luận
				</MenuItem>
			</Menu>
		</div>
	);
}
