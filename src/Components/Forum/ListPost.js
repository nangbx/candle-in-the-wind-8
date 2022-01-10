import React, { useEffect, useState } from "react";
import "./ListPost.scss";
import Pagination from "../Small/PaginationMenu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actFetchGetPost } from "../../Redux/Actions/Posts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ScrollToTop from "react-scroll-to-top";
import BreadcrumbMenu from "../Small/BreadcrumbMenu";
export default function ListPost() {
	const dispatch = useDispatch();
	const [index, setIndex] = useState(1)
	const { posts, reset, pageIndex, totalPages } = useSelector((state) => state.posts);
	useEffect(() => {
		dispatch(actFetchGetPost(index));
	}, [index]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	var url = [
		{
			name: "Home",
			path: "/",
		},
	];
	return (
		<div>
			<BreadcrumbMenu url={url} destination={"Forum"} />
			<div className='post'>
				<ScrollToTop smooth />
				{posts[0] ? (
					posts[0].map((item) => (
						<div className='post-item'>
							<header>
								<Link
									to={{
										pathname: `/forum/${item.id}`,
									}}
								>
									<h2>{item.title}</h2>
								</Link>
								<div className='post-meta'>
									<span className='post-meta-date'>
										{item.approvedAt.substring(0, 10)}
									</span>
								</div>
							</header>
							<div className='post-item-excerpt'>{item.content}</div>
							<footer className='post-footer'>
								<div className='post-action'>
									<Link to={{ pathname: `/forum/${item.id}` }}>
										<a className='post-link primary' href>
											Read now
										</a>
									</Link>
								</div>
								<div className='post-author'>
									<span>By:</span>
									<a href>{item.userName}</a>
								</div>
							</footer>
						</div>
					))
				) : (
					<Box sx={{ display: "flex" }}>
						<CircularProgress />
					</Box>
				)}
				<div className='pagination'>
					<Pagination totalPages={totalPages} index={index} setIndex = {setIndex} />
				</div>
			</div>
		</div>
	);
}
