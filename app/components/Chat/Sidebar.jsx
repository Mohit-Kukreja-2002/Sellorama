"use client"
import React, { useState } from "react";
import { IconButton, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setInitialConversations, setSelectedChat } from "../../../redux/features/chatSlice"; 
import Image from "next/image";

function Sidebar({ loadingSidebar }) {

  const selectedChat = useSelector(state => state.chat.selectedChat);
  const sidebarSellers = useSelector(state => state.chat.sidebarSellers)
  const lastMessages = useSelector(state => state.chat.lastMessages)

  const dispatch = useDispatch();

  return (
    loadingSidebar ?
      <div className="sidebar-container">
        {
          [0, 1, 2, 3].map((_, indx) => (
            <Skeleton key={indx}
              className="mt-3 ml-1"
              variant="rectangular"
              sx={{ width: "100%", borderRadius: "10px" }}
              height={60}
            />
          ))
        }
      </div>
      :
      <div className="sidebar-container">
        <div className={"sb-conversations"}>
          {sidebarSellers.map((conversation, index) => {
            return (
              <div
                onClick={() => {
                  if (conversation._id != selectedChat[0]?._id) {
                    dispatch(setInitialConversations([]))
                  }
                  dispatch(setSelectedChat([conversation, index])
                  )
                }}
                key={conversation._id}
                className={`conversation-container cursor-pointer 
                ${selectedChat[0]?._id == conversation._id ? "bg-[#d9d9d9]" : ""}
              `}>

              {
                conversation?.avatar?.url
                  ? <Image
                    src={conversation?.avatar?.url}
                    alt={`${conversation.shopName} Pic`}
                    height={400}
                    width={400}
                    className="con-icon"
                  />
                  : <p className={"con-icon"}>
                    {conversation.shopName[0]}
                  </p>
              }
              
                <p className={"con-title"}>
                  {conversation.shopName}
                </p>

                <p className="con-lastMessage">
                  {lastMessages[index].message.slice(0, 50)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
  );
}

export default Sidebar;
