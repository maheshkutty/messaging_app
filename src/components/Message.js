import React, { useContext, useEffect, useRef } from "react";


const Message = () => {

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={ref}
      className={`message ${"owner"}`}
    >
      <div className="messageInfo">
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  );
};

export default Message;
