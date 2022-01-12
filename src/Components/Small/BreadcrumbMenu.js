import React from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import './Breadcrumb.scss'
export default function BreadcrumbMenu({url, destination}) {
	const navigate = useNavigate();
	return (
		<div className="Breadcrumb">
			<Breadcrumbs aria-label='breadcrumb'>
				{
					url.map(item => (
						<Link underline="hover" color="inherit" href={void(0)} onClick={() => navigate(`${item.path}`)}>
							{item.name}
							{/* <Link color="inherit" underline="hover" to={item.path}>
								{item.name}
							</Link> */}
						</Link>
					))
				}
				<Typography color='text.primary'>{destination}</Typography>
			</Breadcrumbs>
		</div>
	);
}
