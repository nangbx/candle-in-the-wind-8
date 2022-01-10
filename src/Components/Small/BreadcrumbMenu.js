import React from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import './Breadcrumb.scss'
export default function BreadcrumbMenu({url, destination}) {
	return (
		<div className="Breadcrumb">
			<Breadcrumbs aria-label='breadcrumb'>
				{
					url.map(item => (
						<Link to={item.path}>
							{item.name}
						</Link>
					))
				}
				<Typography variant="h5" color='text.primary'>{destination}</Typography>
			</Breadcrumbs>
		</div>
	);
}
