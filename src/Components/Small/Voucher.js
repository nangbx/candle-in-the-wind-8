import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DialogVoucher from "./DialogVoucher";

export default function Voucher({setVoucher, point}) {
	
	return (
		<React.Fragment>
			<Card sx={{ minWidth: 275, height: 150}}>
				<CardContent>
					<h2>Mã giảm giá</h2>
					<DialogVoucher setVoucher={setVoucher} point={point}/>
				</CardContent>
			</Card>
		</React.Fragment>
	);
}
