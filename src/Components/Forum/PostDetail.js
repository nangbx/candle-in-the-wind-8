import React, { useEffect, useState } from "react";
import "./PostDetail.scss";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { API_URL } from "../../const";
import { useDispatch } from "react-redux";
import {
	actFetchAddComment,
	actFetchGetComment,
} from "../../Redux/Actions/Comment";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EditButton from "./EditButton";
import CommentItem from "./Comments/CommentItem";
import TurnOff from "./TurnOff";
import ScrollToTop from "react-scroll-to-top";
import BreadcrumbMenu from "../Small/BreadcrumbMenu";

export default function PostDetail() {
	const { user, trang_thai } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState({
		state: false
	})
	const {reset} = useSelector(state => state.posts)
	const comment = useSelector((state) => state.comment);
	const [error, setError] = useState({
		state: false,
		mess: "",
	});
	const [cm, setCm] = useState("");
	const [post, setPost] = useState({});
	let navigate = useNavigate();
	const { id } = useParams();
	useEffect(() => {
		fetch(`${API_URL}/api/Posts/${id}`)
			.then((res) => res.json())
			.then((data) => setPost(data));
		dispatch(actFetchGetComment(id));
	}, [reset]);
	const handleBack = () => {
		navigate(-1);
	};
	const handleComment = () => {
		if (!/^(?!\s*$).+/.test(cm)) {
			setError({
				state: true,
				mess: "Bình luận không hợp lệ",
			});
		} else {
			setCm("");
			dispatch(
				actFetchAddComment(id, {
					content: cm,
				})
			);
		}
	};
	var url = [
		{
			name: 'Home',
			path: '/'
		}, {
			name: 'Forum',
			path: '/forum'
		}
	]
	return (
		<div>
		<BreadcrumbMenu url={url} destination={'Xem chi tiết'}/>
		<ScrollToTop smooth />
			<div className='forum-detail'>
				<a onClick={handleBack}>
					<i className='fas fa-arrow-left' />
					Back
					
				</a>
				<div className="edit">
					<TurnOff postID = {id} id = {post.userId} check = {post.commentable}/>
				</div>
				<p className='userName'>{post.userName}</p>
				<h3>{post.title}</h3>
				<p className='userName'>
					{post.approvedAt ? post.approvedAt.substring(0, 10) : ""}
				</p>
				<div className='content'>{post.content}</div>
				<div class='comment'>
					<h2 className='comment-title'>{comment.length} Comments</h2>
					<hr />
					{comment ? (
						comment.map((item) => (
							<CommentItem item = {item} postID={id} check = {post.commentable}/>
						))
					) : (
						<Box sx={{ display: "flex" }}>
							<CircularProgress />
						</Box>
					)}
				</div>
				<div className='add-comment'>
					<h2>Add a comment</h2>
					<TextField
						error={error.state}
						helperText={error.mess}
						fullWidth
						id='standard-textarea'
						label='Bình luận'
						placeholder='Nội dung bình luận'
						multiline
						variant='standard'
						disabled={!trang_thai ? true : (!post.commentable ? true : false)}
						value={cm}
						onChange={(e) => setCm(e.target.value)}
					/>
					<Button
						disabled= {!trang_thai ? true : (!post.commentable ? true : false)}
						onClick={handleComment}
						variant='contained'
					>
						Bình luận
					</Button>
				</div>
			</div>
		</div>
	);
}
