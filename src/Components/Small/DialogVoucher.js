import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import VoucherItem from "./VoucherItem";
import { API_URL } from "../../const";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

function SimpleDialog(props) {
	const [voucher, setVoucher] = useState();
	useEffect(() => {
		fetch(`${API_URL}/api/Vouchers`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + `${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setVoucher(data));
	}, []);
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};
	const handleListItemClick = (value) => {
		onClose(value);
	};

	return (
		<Dialog
			disableScrollLock
			maxWidth={"sm"}
			fullWidth={true}
			onClose={handleClose}
			open={open}
		>
			<DialogTitle>Mã giảm giá</DialogTitle>
			<DialogContent>
				<List sx={{ pt: 2 }}>
					{voucher ? (
						voucher.map((item) => (
							<ListItem
								sx={{ pt: 3, height: 200 }}
								button
								onClick={() => handleListItemClick(item)}
								key={item.id}
							>
								<VoucherItem voucher={item} />
							</ListItem>
						))
					) : (
						<Box sx={{ display: "flex" }}>
							<CircularProgress />
						</Box>
					)}
				</List>
			</DialogContent>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};
export default function DialogVoucher({ setVoucher, point }) {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState("");
	const [selectedName, setSelectedName] = React.useState("");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (item) => {
		setOpen(false);
		setSelectedValue(item.value);
		setVoucher(item);
		setSelectedName(item.name);
	};
	const handleDeleteVoucher = () => {
		setSelectedValue(0);
		setSelectedName('');
		setVoucher({
			value: 0,
			id: null
		})
	}
	return (
		<div>
			<Button
				disabled={point === 0 ? false : true}
				variant='outlined'
				onClick={handleClickOpen}
			>
				Áp dụng mã giảm giá
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
			/>
			<br />
			<Stack direction='row' spacing={1}>
				<Typography variant='subtitle1' component='div'>
					Mã giảm giá: {selectedName}
				</Typography>
				{selectedName === "" ? (
					""
				) : (
					<IconButton aria-label='delete' onClick={handleDeleteVoucher}>
						<DeleteIcon />
					</IconButton>
				)}
			</Stack>
		</div>
	);
}
