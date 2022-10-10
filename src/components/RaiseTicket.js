import React, { useEffect, useContext, useState } from "react";
import { List, ListItem, ListItemText, Button, Divider, Badge } from "@mui/material";
import RaiseTicketForm from "./RaiseTicketForm";
import { getDocs, serverTimestamp, setDoc, updateDoc, collection, doc, addDoc } from "firebase/firestore"
import { AuthContext } from '../context/AuthContext';
import { db } from "../firebase"
import { ChatContext } from '../context/ChatContext';
import { margin } from "@mui/system";
import StatusInd from "./StatusInd";
import * as moment from 'moment';

function RaiseTicket() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch, data } = useContext(ChatContext);
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
      <div className="chats">
        <div className="chatInfo">
          <p style={{ textAlign: "center", fontWeight: "bold", borderRight: "2px solid black" }}>Your Tickets</p>
        </div>
      </div>
      <List sx={{ paddingTop: 0 }}>
        {tickets.map((item) =>
          <ListItem key={item.id} onClick={() => selectTickets(item)} className={`listItemStyle ${data.chatId === item.id && "listItemStyleSelect"}`}>
            <ListItemText primary={item.query} secondary={moment(item.startTime.toMillis().toString(), "x").format("DD MMM YYYY hh:mm a")} />
            {item.resolved == 0 ? <StatusInd color="orange" /> : <StatusInd color="#42ba96" />}

          </ListItem>
        )}
        <ListItem>
          <Button style={{
            borderRadius: 20,
            backgroundColor: "#007bff",
          }} fullWidth variant="contained" onClick={handleClickOpen}>
            Raise Ticket
          </Button>
        </ListItem>
      </List>
      <RaiseTicketForm open={open} setOpen={setOpen} />
    </>
  )
}

export default RaiseTicket;