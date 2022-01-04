import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import "./CartItem.scss";
import { IMG_URL } from "../../const";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import QtyCart from "../Small/QtyCart";
import { actDeleteProductRequest } from "../../Redux/Actions/Cart";
export default function CartItem({data}) {
	const dispatch = useDispatch();
	const [openDialog, setOpenDialog] = useState(false);
	const handleDelete = () => {
		setOpenDialog(true)
	}
	const handleCloseDialog = (value) => {
		setOpenDialog(false);
		if (value) {
			dispatch(actDeleteProductRequest(data.productId));
		}
	};
	return (
		<React.Fragment>
			<tr className='cart-item'>
			<td>
				<img src={`${IMG_URL}${data.productImageUrl}`} />
			</td>
			<td>{data.productName}</td>
			<td>{data.unitPrice}</td>
			<td>
				<QtyCart quantily={data.quantity} id={data.productId} />
			</td>
			<td>{data.price}</td>
			<td>
				<IconButton onClick={handleDelete} aria-label='delete' size='small'>
					<DeleteIcon fontSize='inherit' />
				</IconButton>
			</td>
		</tr>
		<Dialog
				disableScrollLock
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{"Bạn có muốn xóa sản phẩm này?"}
				</DialogTitle>
				<DialogActions>
					<Button onClick={(e) => handleCloseDialog(false)}>Không</Button>
					<Button onClick={(e) => handleCloseDialog(true)} autoFocus>
						Xóa
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
