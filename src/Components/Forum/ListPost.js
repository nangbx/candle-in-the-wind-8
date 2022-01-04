import React, { useEffect } from "react";
import "./ListPost.scss";
import Pagination from "../Small/PaginationMenu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actFetchGetPost } from "../../Redux/Actions/Posts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import ScrollToTop from "react-scroll-to-top";

export default function ListPost() {
	const dispatch = useDispatch();
	const {posts, reset} = useSelector((state) => state.posts);
	useEffect(() => {
		dispatch(actFetchGetPost())
	}, []);
	return (
		<div>
			<div className='forum'>
			<ScrollToTop smooth />
				<h1>Forum</h1>
				{posts[0] ? (
					posts[0].map((item) => (
						<div className='forum-item' key={item.key}>
							<div className='user'>
								<i className='fas fa-user' />
								<h4>{item.userName}</h4>
							</div>
							<div className='info'>
								<p>{item.approvedAt}</p>
								<Link
									to={{
										pathname: `/forum/${item.id}`,
									}}
								>
									{item.title}
								</Link>
								<div className='comments'>{item.commentCount} comments</div>
							</div>
						</div>
					))
				) : (
					<Box sx={{ display: "flex" }}>
						<CircularProgress />
					</Box>
				)}
				<div className='pagination'>
					<Pagination />
				</div>
			</div>
		</div>
	);
}
