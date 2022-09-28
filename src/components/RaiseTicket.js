import React, { useEffect, useContext, useState } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import RaiseTicketForm from "./RaiseTicketForm";
import { getDocs, serverTimestamp, setDoc, updateDoc, collection, doc, addDoc } from "firebase/firestore"
import { AuthContext  } from '../context/AuthContext';
import { db } from "../firebase"
import { ChatContext } from '../context/ChatContext';

function RaiseTicket() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getAllTickets = async () => {
    const querySnapShot = await getDocs(collection(db, "session", currentUser.uid, "chats"))
    const temp = []
    querySnapShot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    })
    setTickets(temp);
  }

  useEffect(() => {
    console.log("called", currentUser.uid)
    currentUser.uid && getAllTickets();
  }, [open, currentUser.uid])

  const selectTickets = (data) => {
    console.log(data)
    dispatch({ type: "CHANGE_USER", payload: data });
  }

  return (
    <>
      <List>
        {tickets.map((item) =>
          <ListItem key={item.id} onClick={() => selectTickets(item)} style={{cursor:"pointer"}}>
            <ListItemText primary={item.query} secondary={item.startTime.toMillis().toString()} />
          </ListItem>
        )}
        <ListItem>
          <Button fullWidth variant="outlined" onClick={handleClickOpen}>
            Raise Ticket
          </Button>
        </ListItem>
      </List>
      <RaiseTicketForm open={open} setOpen={setOpen} />
    </>
  )
}

export default RaiseTicket;