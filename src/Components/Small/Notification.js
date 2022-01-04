import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from '@mui/icons-material/Notifications';
const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}));
export default function Notification() {
	return (
		<IconButton aria-label='cart'>
			<StyledBadge badgeContent={4} color='secondary'>
				<NotificationsIcon />
			</StyledBadge>
		</IconButton>
	);
}
