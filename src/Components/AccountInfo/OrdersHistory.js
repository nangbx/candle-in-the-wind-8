import {
	Box,
	Button,
	Card,
	CardHeader,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import { SeverityPill } from "./SeverityPill";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../../const";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { notifySuccess, notifyError } from "../../Redux/Actions/Notify";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PaginationMenu from "../Small/PaginationMenu"
const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function OrdersHistory({ set }) {
	const [orders, setOrders] = useState();
	const dispatch = useDispatch();
	const [pageIndex, setPageIndex] = useState(1)
	useEffect(() => {
		fetch(`${API_URL}/api/Orders/MyOrders?pageIndex=${pageIndex}&pageSize=5`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, [pageIndex]);
	const handleCancel = (id) => {
		let noti = {
			state: true,
			mess: "",
		};
		fetch(`${API_URL}/api/Orders/MyOrder/${id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					noti.state = false;
				}
				return res.json();
			})
			.then((mess) => {
				if (noti.state) {
					dispatch(notifySuccess(mess.message));
					fetch(`${API_URL}/api/Orders/MyOrders`, {
						method: "GET",
						headers: {
							Authorization:
								`Bearer ${localStorage.getItem("accessToken")}`,
						},
					})
						.then((res) => res.json())
						.then((data) => setOrders(data));
				} else {
					dispatch(notifyError(mess.error));
				}
			});
	};
	return (
		<Card>
			<CardHeader title='Lịch sử đơn hàng' />

			<Box sx={{ minWidth: 800, marginBottom: 5 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Tên sản phẩm</TableCell>
							<TableCell sortDirection='desc'>Tổng giá</TableCell>
							<TableCell>Trạng thái</TableCell>
							<TableCell>Hủy đơn</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders
							? orders.orders.map((order) => (
									<TableRow hover key={order.id}>
										<TableCell>{order.id}</TableCell>
										<TableCell>
											<Stack spacing={2}>
												{order ? (
													order.productName.map((item) => <Item>{item}</Item>)
												) : (
													<Item></Item>
												)}
											</Stack>
										</TableCell>
										<TableCell>{order.total}</TableCell>
										<TableCell>
											<SeverityPill
												color={
													(order.status === 1 && "success") ||
													(order.status === 3 && "error") ||
													"warning"
												}
											>
												{order.statusName}
											</SeverityPill>
										</TableCell>
										<TableCell>
											<Button
												disabled = {(order.status !== 0) ? true : false}
												variant='outlined'
												startIcon={<DeleteIcon />}
												onClick={(e) => handleCancel(order.id)}
											>
												Hủy đơn
											</Button>
										</TableCell>
									</TableRow>
							  ))
							: "Không có đơn hàng nào"}
					</TableBody>
				</Table>
			</Box>
			<PaginationMenu
				totalPages={orders ? orders.totalPages : 0}
				index={pageIndex}
				setIndex={setPageIndex}
			/>
		</Card>
	);
}
