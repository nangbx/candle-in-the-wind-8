import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { closeDialog } from "../../Redux/Actions/Dialog";
import {API_URL} from "../../const";
import {notifySuccess} from "../../Redux/Actions/Notify"


export default function ForumItem() {
	const { state } = useSelector((state) => state.dialog);
	const dispatch = useDispatch();
	const [title, setTilte] = React.useState('')
	const [content, setContent] = React.useState('')
	const [error, setError] = React.useState({
		title:{
			state: false,
			mess: ''
		},
		content:{
			state: false,
			mess: ''
		}
	})

	const handleClose = () => {
		dispatch(closeDialog());
	};
	const handleSubmit = () => {
		if(!(/^(?!\s*$).+/.test(title))){
			setError(prev => ({
				...prev,
				title:{
					state: true,
					mess: 'Chưa nhập tiêu đề'
				}
			}))
		}
		if(!(/^(?!\s*$).+/.test(content))){
			setError(prev => ({
				...prev,
				content: {
					state: true,
					mess: 'Chưa nhập nội dung'
				},
				
			}))
		}
		if((/^(?!\s*$).+/.test(content)) && (/^(?!\s*$).+/.test(title))){
			const data = {
				title: title,
				content: content
			}
			fetch(`${API_URL}/api/Posts/Posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(mess => dispatch(notifySuccess(mess)))
			dispatch(notifySuccess('Bài viết đang được duyệt'))
			setTilte('');
			setContent('')
			dispatch(closeDialog());
		}
	}
	const handleChange = (e) => {
		if(e.target.id === 'title'){
			setTilte(e.target.value)
		} else{
			setContent(e.target.value)
		}
		setError(prev => ({
			...prev,
			[e.target.id]: {
				state: false,
				mess: ''
			}
		}))
	}
	return (
		<React.Fragment>
			<Dialog  fullWidth={true} maxWidth={'lg'} disableScrollLock open={state} onClose={handleClose}>
				<DialogTitle>Tạo bài viết</DialogTitle>
				<DialogContent>
					<TextField
						error = {error.title.state}
						autoFocus
						margin='dense'
						id='title'
						label='Tiêu đề'
						fullWidth
						variant='standard'
						helperText={error.title.mess}
						value={title}
						onChange={handleChange}
					/>
					<TextField
						id='content'
						label='Nội dung'
						multiline
						rows={8}
						error = {error.content.state}
						helperText={error.content.mess}
						fullWidth
						variant='standard'
						value={content}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Đăng bài</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
