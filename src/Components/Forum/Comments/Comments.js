import React from "react";
import List from '@mui/material/List';
import CommentItem from "./CommentItem";
export default function Comments() {
	return (
		<div>
			<List sx={{ bgcolor: "background.paper", width: 400 }}>
				<CommentItem/>
                <CommentItem/>
                <CommentItem/>
			</List>
		</div>
	);
}
