import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./QtyCart.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { notifyWarning } from "../../Redux/Actions/Notify";
import { actDeleteProductRequest, actUpdateProductRequest } from "../../Redux/Actions/Cart";
export default function QtyCart({ quantily, id, max }) {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
	const [qty, setQty] = useState(quantily);
	useEffect(() => {
		setQty(quantily)
	}, [quantily])
    useEffect(() => {
        dispatch(actUpdateProductRequest({id: id, count: qty}))
    }, [qty])
    const handleDecrement = () => {
		if (qty === 1) {
			setOpenDialog(true);
		}
		setQty((prev) => {
            if(prev === 1){
				return prev;
			}
			return prev - 1;
		});
	};
    const handleCloseDialog = (value) => {
		setOpenDialog(false);
		console.log(value)
		if (value === true) {
			dispatch(actDeleteProductRequest(id))
		}
	};
	const handleIncrement = () => {
        if(qty >= max){
			dispatch(notifyWarning('Vượt quá số lượng cho phép'))
		} else{
			setQty(qty + 1)
		}
	};
    const handleOnChange = (e) => {
        const reg = new RegExp("^[0-9]+$");
		if (reg.test(e.target.value)) setQty(parseInt(e.target.value));
		else if (e.target.value === "") {
			setQty(0);
		}
    }
    const handleBlur = (e) => {
		if (qty === 0) {
			setQty(1);
		} else if(qty > max){
			dispatch(notifyWarning('Vượt quá số lượng cho phép'))
			setQty(max)
		}
    }
	return (
		<React.Fragment>
			<div className='product-quantity'>
				<div className='dec qtybutton' onClick={handleDecrement}>-</div>
				<input type='text' value={qty} onChange={handleOnChange} onBlur={handleBlur} />
				<div className='inc qtybutton' onClick={handleIncrement}>+</div>
			</div>
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
