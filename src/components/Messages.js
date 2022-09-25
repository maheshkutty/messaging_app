import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";


const Messages = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="messages">
      <Message />
    </div>
  );
};

export default Messages;
