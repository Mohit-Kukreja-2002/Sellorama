import React from "react";

function MessageSelf({ message }) {
  
  return (
    <div className="self-message-container">
      <div className="messageBox max-w-[200px] 400px:max-w-[240px] 500px:max-w-[280px] 800px:max-w-[340px] 1000px:max-w-[400px] break-words ">
        <p style={{ color: "black" }}>{message.message}</p>
      </div>
    </div>
  );
}

export default MessageSelf;
