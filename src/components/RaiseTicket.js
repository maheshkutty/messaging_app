import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

function RaiseTicket() {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Bank account issue" secondary="Jan 14, 2022" />
      </ListItem>
      <ListItem>
        <Button fullWidth variant="outlined">
          Raise Ticket
        </Button>
      </ListItem>
    </List>
  )
}

export default RaiseTicket;