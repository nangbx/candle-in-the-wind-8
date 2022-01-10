import React, { useState } from "react";
import EditButton from "../EditButton";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { actFetchEditComment } from "../../../Redux/Actions/Comment";
export default function CommentItem({ item, postID, check }) {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState({
		state: false,
	});
	const [value, setValue] = useState(item.content);
	const handleEnter = (e) => {
		if (e.code === "Enter") {
			dispatch(
				actFetchEditComment(postID, item.id, {
					content: value,
				})
			);
			setEdit({ state: false });
		}
	};
	console.log(item)
	return (
		<div class='comments-item'>
			<div class='comments-user'>
				<i class='fas fa-user-circle'></i>
			</div>
			<div class='comments-content'>
				<div class='comments-info'>
					<p>{item.userName}</p>
					<p>{item.time}</p>
					{edit.state ? (
						<TextField
							required
							fullWidth
							id='outlined-required'
							value={value}
							onKeyUp={handleEnter}
							onChange={(e) => setValue(e.target.value)}
						/>
					) : (
						<div className='comment-content'>
							<div className='sup' />
							<div className='content-cm'>
								{item.content}
							</div>
						</div>
					)}
				</div>
				<EditButton
					id={item.userId}
					setState={setEdit}
					postID={postID}
					commentID={item.id}
					check={check}
				/>
			</div>
		</div>
	);
}
