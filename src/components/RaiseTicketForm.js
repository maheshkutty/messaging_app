import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { onSnapshot, serverTimestamp, setDoc, updateDoc, collection, doc, addDoc } from "firebase/firestore"
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';
import { uuidv4 } from '@firebase/util';

export default function RaiseTicketForm({ open, setOpen }) {
	const { currentUser } = useContext(AuthContext);
	const [query, setQuery] = useState("");

	const onSubmitRaiseTicket = async () => {
		let payload = {
			query,
			startTime: serverTimestamp(),
			endTime: "",
			userId: currentUser.uid,
			resolved: 0,
			adminId: "",
			messages: []
		}
		console.log(payload)
		await addDoc(collection(db, "session", currentUser.uid, "chats"), payload)
		handleClose();
	}

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						value={query}
						margin="dense"
						id="name"
						label="Query"
						type="email"
						fullWidth
						onChange={(e) => setQuery(e.target.value)}
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={onSubmitRaiseTicket}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
