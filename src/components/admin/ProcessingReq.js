import React from "react"
import AdminPanel from ".";
import { Grid } from "@mui/material"
import Chats from "../Chats";
import Solved from "./Solved";

function ProcessingReq() {
  return (
    <AdminPanel>
      <Grid item xs="3">
        <Solved />
      </Grid>
      <Grid item xs="9" sx={{ height: "100%" }}>
        <Chats />
      </Grid>
    </AdminPanel>
  )
}

export default ProcessingReq;