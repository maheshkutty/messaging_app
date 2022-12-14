import React, { useContext } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { ChatContext } from "../../context/ChatContext"
import * as moment from 'moment';

function Solved({ processReq, setUserId }) {
  const { dispatch, data } = useContext(ChatContext);

  const getChats = (item) => {
    console.log(item)
    setUserId(item.userId);
    dispatch({ type: "CHANGE_USER", payload: item })
  }

  return (
    <>
      <div className="chats">
        <div className="chatInfo">
          <p style={{ textAlign: "center", fontWeight: "bold", borderRight: "2px solid black" }}>Your Tasks</p>
        </div>
      </div>
      <List sx={{ paddingTop: 0 }}>
        {processReq.map((item) =>
          <ListItem className={`listItemStyle ${data.chatId === item.id && "listItemStyleSelect"}`} onClick={() => getChats(item)} >
            <ListItemText primary={item.query} secondary={moment(item.startTime.toMillis().toString(), "x").format("DD MMM YYYY hh:mm a")} />
          </ListItem>
        )}
      </List>
    </>
  )
}

export default Solved;