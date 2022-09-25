import { Grid } from "@mui/material";
import React from "react";
import RaiseTicket from "./RaiseTicket";
import Chats from "./Chats";
import NavBar from "./NavBar";

function SideBar() {
  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs="12">
          <NavBar />
        </Grid>
        <Grid item xs="3" sx={{height:"100%"}}>
          <RaiseTicket />
        </Grid>
        <Grid item xs="9" sx={{height:"100%"}}>
          <Chats />
        </Grid>
      </Grid>
    </>
  )
}

export default SideBar;