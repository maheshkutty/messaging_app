import React, { useEffect, useContext, useState } from "react"
import { Grid } from "@mui/material"
import Chats from "./Chats";
import Solved from "./Solved";
import AdminPanel from ".";
import { CustReqContext } from "../../context/CustReqContext";
import { AuthContext } from "../../context/AuthContext";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase";

function ProcessingReq() {
  const { data } = useContext(CustReqContext)
  const { currentUser } = useContext(AuthContext);
  const [processReq, setProcessReq] = useState([]);
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");

  const getAcceptedReq = async () => {
    let temp = [];
    for (const id of data) {
      const qSnap = await getDocs(query(collection(db, "session", id, "chats"), where("adminId", "==", currentUser.uid)));
      qSnap.forEach(item => {
        temp.push({ ...item.data(), id: item.id })
      })
    }
    setProcessReq(temp);
  }

  useEffect(() => {
    console.log(data)
    getAcceptedReq();
  }, []);

  return (
    <AdminPanel>
      <Grid item xs="3" sx={{ height: "100%", background: "white" }}>
        <Solved processReq={processReq} setUserId={setUserId} />
      </Grid>
      <Grid item xs="9" sx={{ height: "100%", background: "white" }}>
        <Chats userId={userId} />
      </Grid>
    </AdminPanel>
  )
}

export default ProcessingReq;