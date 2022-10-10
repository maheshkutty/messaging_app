import React, { useEffect, useState, useContext } from "react"
import { onSnapshot, doc, collection, updateDoc, query, getDocs } from "firebase/firestore"
import { Button, List, ListItem, ListItemText, Grid, Typography, Divider, Box, Stack } from "@mui/material"
import { CustReqContext } from "../../context/CustReqContext"
import { db } from "../../firebase";
import Messages from "../Messages";
import AdminPanel from ".";
import { AuthContext } from "../../context/AuthContext";
import * as moment from 'moment';

function CustomerReq() {
  const [userids, setUserIds] = useState([]);
  const [custReq, setCustReq] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(CustReqContext);

  const callReq = () => {
    return onSnapshot(query(collection(db, "session")), (querySnapshot) => {
      let tempids = []
      querySnapshot.forEach((doc) => {
        console.log(doc)
        tempids.push(doc.id);
      });
      console.log(tempids);
      setUserIds(tempids);
      dispatch({ type: "CHANGE_REQ", payload: tempids })
    })
  }

  useEffect(() => {
    const unSub = callReq();
    return () => {
      unSub();
    }
  }, [])

  const getAllChats = async () => {
    let custReqData = [];
    for (const id of userids) {
      const querySnapshot = await getDocs(collection(db, "session", id, "chats"));
      querySnapshot.forEach((doc) => {
        if (doc.data().adminId == "")
          custReqData.push({ ...doc.data(), id: doc.id });
      });
    }
    console.log(custReqData)
    setCustReq(custReqData);
  }

  useEffect(() => {
    getAllChats();
  }, [userids])

  const acceptReq = async (item) => {
    try {
      const chatId = item.id;
      delete item.id;
      await updateDoc(doc(db, "session", item.userId, "chats", chatId), {
        ...item,
        adminId: currentUser.uid
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AdminPanel>
      <Grid item xs="6" sx={{ height: "100%", background: "rgba(255,255,255,1)", marginTop: 2, borderRadius: 2 }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-around" }}>
          <h1>All Customer Tickets</h1>
          {/* <Button variant="contained" onClick={() => callReq()} size="small" sx={{ height: "50%", alignSelf: "center" }} color="warning">Refresh</Button> */}
        </Stack>
        <Divider variant="middle" />
        <List>
          {custReq.map((item) =>
            <>
              <ListItem className="listItemStyle" key={item.id} onClick={() => acceptReq(item)}>
                <ListItemText primary="User 201" secondary={
                  <>
                    <Typography component="span"
                      variant="body2">{item.query}</Typography>
                    <Typography
                      variant="body2">{moment(item.startTime.toMillis().toString(), "x").format("DD MMM YYYY hh:mm a")}</Typography>
                  </>
                } />
                <Button style={{
                  borderRadius: 5,
                  backgroundColor: "#007bff",
                }} size="small" variant="contained">
                  Accept
                </Button>
              </ListItem>
              <Divider variant="middle" />
            </>
          )}
        </List>
      </Grid>
    </AdminPanel>
  )
}

export default CustomerReq;