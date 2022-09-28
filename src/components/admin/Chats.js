import React, { useContext, useEffect, useState } from "react";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import "../styles.scss"
import Input from "./Input";
import Message from "../Message";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Chats = ({ userId }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  console.log(currentUser)

  useEffect(() => {
    if (userId) {
      const unSub = onSnapshot(doc(db, "session", userId, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      })
      return () => {
        unSub();
      }
    }
  }, [data.chatId])


  return (
    <div className="chat" style={{ height: "100%" }}>
      <div className="chatInfo">
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <div className="messages">
        {messages.map((item) => <Message key={item.id} message={item} />)}
      </div>
      <Input userId={userId} />
    </div>
  );
};

export default Chats;
