import React from "react";
import Pagination from "@mui/material/Pagination";
import './Pagination.scss'
export default function PaginationMenu({totalPages, index, setIndex}) {
	const handleChange = (event, value) => {
		setIndex(value)
	}
	return ( 
		<div className="pagination">
			<Pagination count={totalPages} page = {index} color='primary' onChange={handleChange}/>
		</div>
	);
}
