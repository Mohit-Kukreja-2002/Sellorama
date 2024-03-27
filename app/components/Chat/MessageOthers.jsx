import React from "react";
import "../../css/chatPage.css"
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

function MessageOthers({ selectedChat, message }) {
  return (
    <div className={"other-message-container"}>
      <div className={"conversation-container"}>
        {
          selectedChat[0]?.avatar?.url
            ? <Image
              src={selectedChat[0]?.avatar?.url}
              alt={`${selectedChat[0].shopName} Pic`}
              height={400}
              width={400}
              className="con-icon"
            />
            : <p className={"con-icon"}>
              {selectedChat[0].shopName[0]}
            </p>
        }
        <div className={"other-text-content"}>
          <p className={"con-title"}>
            {/* {"Mohit"} */}
          </p>
          <p className={"con-lastMessage break-words 400px:max-w-[200px] 500px:max-w-[240px] 800px:max-w-[320px] 1000px:max-w-[400px]"}>
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageOthers;
