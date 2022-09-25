import React from "react"
import AdminPanel from ".";
import Messages from "../Messages";
import { Button, List, ListItem, ListItemText, Grid, Typography } from "@mui/material"

function CustomerReq() {
  return (
    <AdminPanel>
      <Grid item xs="4" sx={{ height: "100%" }}>
        <List>
          <ListItem>
            <ListItemText primary="User 201" secondary={
              <>
                <Typography component="span"
                  variant="body2">Bank Account issue</Typography>
                <Typography
                  variant="body2">Jul, 12 2022</Typography>
              </>
            } />
            <Button size="small" variant="contained">
              Accept
            </Button>
          </ListItem>
        </List>
      </Grid>
    </AdminPanel>
  )
}

export default CustomerReq;