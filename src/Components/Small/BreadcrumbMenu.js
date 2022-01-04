import React from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './Breadcrumb.scss'
export default function BreadcrumbMenu() {
	return (
		<div className="Breadcrumb">
			<Breadcrumbs aria-label='breadcrumb'>
				<Link underline='hover' color='inherit' href='/'>
					MUI
				</Link>
				<Link
					underline='hover'
					color='inherit'
					href='/getting-started/installation/'
				>
					Core
				</Link>
				<Typography color='text.primary'>Breadcrumbs</Typography>
			</Breadcrumbs>
		</div>
	);
}
