import React, { useEffect, useContext, useState } from "react"
import { Grid } from "@mui/material"
import Chats from "../Chats";
import Solved from "./Solved";
import AdminPanel from ".";
import { CustReqContext } from "../../context/CustReqContext";
import { AuthContext } from "../../context/AuthContext";

function ProcessingReq() {
  const { data } = useContext(CustReqContext)
  const { currentUser } = useContext(AuthContext);
  const [processReq, setProcessReq] = useState([]);
  const [chats, setChats] = useState([]);

  const getAcceptedReq = () => {
    let temp = [];
    data.forEach((item) => {
      if (item.adminId == currentUser.uid && item.resolved == 0) {
        temp.push(item);
        setProcessReq(temp);
      }
    })
  }

  useEffect(() => {
    getAcceptedReq();
  }, [data])

  return (
    <AdminPanel>
      <Grid item xs="3"> 
        <Solved processReq={processReq} setChats={setChats} />
      </Grid>
      <Grid item xs="9" sx={{ height: "100%" }}>
        <Chats />
      </Grid>
    </AdminPanel>
  )
}

export default ProcessingReq;