import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

function Solved({ processReq, setChats }) {
  const getChats = (item) => {
    setChats(item.messages);
  }

  return (
    <List>
      {processReq.map((item) =>
        <ListItem onClick={getChats} style={{ cursor: "pointer" }}>
          <ListItemText primary={item.query} secondary={item.startTime.toMillis().toString()} />
        </ListItem>
      )}
    </List>
  )
}

export default Solved;