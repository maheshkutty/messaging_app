import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import Message from "./Message";


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "session", currentUser.uid, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        console.log(doc.data().messages)
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((item) => <Message key={item.id} message={item} />)}
    </div>
  );
};

export default Messages;
