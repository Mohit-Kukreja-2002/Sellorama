import React, { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageOthers from "./MessageOthers.jsx";
import Skeleton from "@mui/material/Skeleton";
import MessageSelf from "./MessagSelf.jsx";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";


import useGetChat from "../../hooks/chat/getChat.jsx";
import useSendMessage from "../../hooks/chat/sendMessage.jsx";

import { addMessage, addMoreMessages, setInitialConversations, setSelectedChat, updateLastMessage } from "../../../redux/features/chatSlice.js";

function ChatArea({ socket }) {

    const [moreChatsExists, setMoreChatsExists] = useState(false);
    const [fetchingStarted, setFetchingStarted] = useState(false);
    const [pages, setPages] = useState(1);

    // Get conversations hook
    const { loading, getConversations } = useGetChat();
    const { loading: otherLoading, getConversations: getConvo } = useGetChat();
    // send Message hook
    const { sendMessage: sendMsg } = useSendMessage();

    // For message input
    const [messageContent, setMessageContent] = useState("")

    const dispatch = useDispatch()

    const conversations = useSelector(state => state.chat.conversations)
    const selectedChat = useSelector(state => state.chat.selectedChat)
    const lastMessages = useSelector(state => state.chat.lastMessages)


    const sellerId = selectedChat[0]._id;

    const sendMessage = async () => {
        let message = messageContent.trim()
        if (message.length > 0) {
            const response = await sendMsg(message, sellerId);
            if (response) {
                dispatch(addMessage({ receiver: sellerId, message: message }))
                dispatch(updateLastMessage(message))
                setMessageContent("");
            }
        }
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getConversations(selectedChat[0]._id);
                if (response[0]) {
                    dispatch(setInitialConversations(response[1]))
                    // console.log(response[1].length)
                    if (response[1].length >= 50) {
                        setMoreChatsExists(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching chat data", error);
            }
        }
        conversations.length === 0 && fetchData();

        return () => dispatch(setInitialConversations([]))
    }, [selectedChat[0]])

    const containerRef = useRef(null);

    // Function to check if the last message is in view
    const isLastMessageInView = () => {
        const container = containerRef.current;
        if (container) {
            const lastMessage = container.lastElementChild;
            if (lastMessage) {
                const rect = lastMessage.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
        }
        return false;
    };

    async function handleScroll(e) {
        e.preventDefault();
        const needToFetch = isLastMessageInView()

        if (needToFetch && !fetchingStarted && moreChatsExists && !otherLoading) {
            setFetchingStarted(true);
            setPages(prev => prev + 1);
            await fetchData();
        }
    }

    async function fetchData() {
        try {
            const response = await getConvo(selectedChat[0]._id, pages);
            if (response[0]) {
                dispatch(addMoreMessages(response[1]))
                if (response[1].length < 50) {
                    setMoreChatsExists(false)
                }
            }
        } catch (error) {
            console.error("Error fetching chat data", error);
        }
        setFetchingStarted(false)
    }


    if (loading) {
        return (
            <div
                style={{
                    border: "20px",
                    padding: "10px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", borderRadius: "10px" }}
                    height={60}
                />
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: "100%",
                        borderRadius: "10px",
                        flexGrow: "1",
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", borderRadius: "10px" }}
                    height={60}
                />
            </div>
        );
    } else {
        return (
            <div className={"chatArea-container"}>
                <div className={"chatArea-header"}>
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
                    <div className="flex flex-col grow">
                        <div className={"header-text"}>
                            <p className={"con-title"}>
                                {
                                    selectedChat[0].shopName.length > 13
                                        ? selectedChat[0].shopName.slice(0, 10) + "..."
                                        : selectedChat[0].shopName
                                }
                            </p>
                        </div>
                        <p className={"text-[#0000008a] text-sm"}>
                            {selectedChat[0].upi}
                        </p>
                    </div>
                    <div
                        className="p-1 400px:p-2 text-[#0000008a] rounded-lg cursor-pointer hover:bg-[#d9d9d9] mr-1 400px:mr-4 "
                        onClick={() => dispatch(setSelectedChat(["", -1]))}
                    >
                        <IoArrowBack size={25} />
                    </div>
                </div>
                <div className={"messages-container"} onScroll={(e) => handleScroll(e)} ref={containerRef}>
                    {conversations.map((message, index) => {
                        const receiver = message.receiver
                        if (receiver === sellerId) {
                            return <MessageSelf message={message} key={index} />;
                        } else {
                            return <MessageOthers selectedChat={selectedChat} message={message} key={index} />;
                        }
                    })}
                </div>
                <div className={"text-input-area"}>
                    <input
                        placeholder="Type a Message"
                        className={"search-box"}
                        value={messageContent}
                        onChange={(e) => {
                            setMessageContent(e.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.code == "Enter") {
                                sendMessage();
                            }
                        }}
                    />
                    <IconButton
                        className={"icon"}
                        onClick={() => {
                            sendMessage();
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </div>
            </div >
        );
    }
}

export default ChatArea;
