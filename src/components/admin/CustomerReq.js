import React, { useEffect, useState, useContext } from "react"
import { onSnapshot, doc, collection, updateDoc } from "firebase/firestore"
import { Button, List, ListItem, ListItemText, Grid, Typography } from "@mui/material"
import { CustReqContext } from "../../context/CustReqContext"
import { db } from "../../firebase";
import Messages from "../Messages";
import AdminPanel from ".";
import { AuthContext } from "../../context/AuthContext";

function CustomerReq() {
  const [userids, setUserIds] = useState([]);
  const [custReq, setCustReq] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(CustReqContext);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "session"), (querySnapshot) => {
      let tempids = []
      querySnapshot.forEach((doc) => {
        tempids.push(doc.id);
      });
      console.log(tempids);
      setUserIds(tempids);
    })
    return () => {
      unSub();
    }
  }, [])

  const getAllChats = () => {
    console.log("called")
    userids.forEach((id) => {
      onSnapshot(collection(db, "session", id, "chats"), (querySnapshot) => {
        let custReqData = [];
        querySnapshot.forEach((doc) => {
          custReqData.push({ ...doc.data(), id: doc.id });
        });
        setCustReq(custReqData);
        dispatch({ type: "CHANGE_REQ", payload: custReqData })
      })
    })
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
      <Grid item xs="4" sx={{ height: "100%" }}>
        <List>
          {custReq.map((item) =>
            <ListItem key={item.id} onClick={() => acceptReq(item)}>
              <ListItemText primary="User 201" secondary={
                <>
                  <Typography component="span"
                    variant="body2">{item.query}</Typography>
                  <Typography
                    variant="body2">{item.startTime.toMillis().toString()}</Typography>
                </>
              } />
              <Button size="small" variant="contained">
                Accept
              </Button>
            </ListItem>
          )}
        </List>
      </Grid>
    </AdminPanel>
  )
}

export default CustomerReq;