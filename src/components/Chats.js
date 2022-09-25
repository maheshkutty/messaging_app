import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import "./styles.scss"

const Chats = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  return (
    <div className="chat" style={{height:"100%"}}>
      <div className="chatInfo">
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/> 
    </div>
  );
};

export default Chats;
