import React, { useState } from "react";
import EditButton from "../EditButton";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { notifySuccess } from "../../../Redux/Actions/Notify";
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
	const formatDay = (date) => {
		const obj = new Date(date);
		const month = String(obj.getMonth() + 1).padStart(2, "0");
		const day = String(obj.getDate()).padStart(2, "0");
		const year = obj.getFullYear();
		return day + "/" + month + "/" + year;
	};
	return (
		<div class='comments-item'>
			{item ? (<React.Fragment>
				<div class='comments-user'>
				<i class='fas fa-user-circle'></i>
			</div>
			<div class='comments-content'>
				<div class='comments-info'>
					<p>{item.userName}</p>
					<p>{formatDay(item.time.substring(0, 10))}</p>
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
			</React.Fragment>) : ''}
		</div>
	);
}
