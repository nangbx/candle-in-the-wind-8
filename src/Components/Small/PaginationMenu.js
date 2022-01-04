import React from "react";
import Pagination from "@mui/material/Pagination";
import './Pagination.scss'
export default function PaginationMenu() {
	return (
		<div className="pagination">
			<Pagination count={10} color='primary' />
		</div>
	);
}
