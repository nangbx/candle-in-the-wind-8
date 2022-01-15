import React from "react";
import OrdersHistory from "./OrdersHistory"
import "./Orders.scss"
export default function Orders({set, setID}) {
	return (
		<div className="orders">
			<OrdersHistory set = {set} setID = {setID}/>
		</div>
	);
}
