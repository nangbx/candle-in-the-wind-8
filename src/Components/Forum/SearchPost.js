import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadcrumbMenu from "../Small/BreadcrumbMenu";
import { Link } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ScrollToTop from "react-scroll-to-top";
import Pagination from "../Small/PaginationMenu";
import "./ListPost.scss";
import { API_URL } from '../../Redux/Constants/Config';
export default function SearchPost() {
    const {key} = useParams();
    const [index, setIndex] = useState(1);
    const [posts, setPosts] = useState();
    const url = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Forum',
            path: '/forum'
        }
    ]
    useEffect(() => {
        fetch(`${API_URL}/api/Posts/Search?pageIndex=1&pageSize=4&searchText=${key}`)
            .then(res => res.json())
            .then(data => setPosts(data))
    })
    return (
        <div>
            <BreadcrumbMenu url={url} destination={"Tìm kiếm bài viết"}/>
            <div className='post'>
				<ScrollToTop smooth />
				{posts ? (
					posts.posts.map((item) => (
						<div className='post-item'>
							<header>
								<Link
									to={`/forum/${item.id}`}
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
					<Pagination
						totalPages={posts ? posts.totalPages: 0}
						index={index}
						setIndex={setIndex}
					/>
				</div>
			</div>
        </div>
    )
}
