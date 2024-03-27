import React, { useEffect, useRef, useState } from 'react'
import useGetSellerDetails from '../../hooks/chat/getSellerDetails'
import SendIcon from "@mui/icons-material/Send";

import '../../css/chatPage.css'
import { IconButton } from '@mui/material';
import useSendMessage from '../../hooks/chat/sendMessage';
import MessageSelf from '../Chat/MessagSelf';
import MessageOthers from '../Chat/MessageOthers';
import useGetChat from '../../hooks/chat/getChat';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import useListenMessagesAndGetBack from '../../hooks/chat/useListenMessageAndGetBack';
import { messageFromChatBox, refetchChat } from '../../../redux/features/chatSlice';


const ChatBox = ({ setChatOpen, id, sellerId }) => {
    const { getSeller } = useGetSellerDetails()
    const [sellerDetails, setSellerDetails] = useState({});
    const [messageContent, setMessageContent] = useState("")
    const [conversations, setConversations] = useState([])

    const [moreChatsExists, setMoreChatsExists] = useState(false);
    const [fetchingStarted, setFetchingStarted] = useState(false);
    const [pages, setPages] = useState(1);

    const { loading, getConversations } = useGetChat();
    const { loading: otherLoading, getConversations: getConvo } = useGetChat();

    const { sendMessage: sendMsg } = useSendMessage();

    const [lastMessageSent, setLastMessagesSent] = useState("")
    const dispatch = useDispatch();


    const sendMessage = async () => {
        let message = messageContent.trim()
        if (message.length > 0) {
            const response = await sendMsg(message, sellerId);
            if (response) {
                setConversations([
                    { receiver: sellerId, message: message },
                    ...conversations
                ])
                dispatch(refetchChat(true));
                // dispatch(messageFromChatBox(
                //     {
                //         newMessage: { receiver: sellerId, message: message },
                //         id: sellerId
                //     }
                // ))
                setMessageContent("");
            }
        }
    }



    useEffect(() => {
        async function fetchData() {
            try {
                const sellerDetail = await getSeller(sellerId);
                const response = await getConversations(sellerId);

                if (sellerDetail[0]) {
                    setSellerDetails(sellerDetail[1]);
                }

                if (response[0]) {
                    setConversations(response[1])
                    if (response[1].length >= 50) {
                        setMoreChatsExists(true);
                    }
                }

            } catch (error) {
                console.error("Error fetching chat section", error);
            }
        }
        fetchData();
        dispatch(refetchChat(false))

    }, [])


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
            const response = await getConvo(sellerId, pages);
            if (response[0]) {
                setConversations([...conversations, ...response[1]])
                if (response[1].length < 50) {
                    setMoreChatsExists(false)
                }
            }
        } catch (error) {
            console.error("Error fetching chat data", error);
        }
        setFetchingStarted(false)
    }


    // For socket connection
    const [socket, setSocket] = useState(null)
    const user = useSelector(state => state.auth.user)
    const isAuth = useSelector(state => state.auth.isAuth)

    // useeffect for establishing socket connection
    useEffect(() => {
        if (isAuth) {
            const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
                query: {
                    userId: user._id,
                },
            });

            setSocket(socket);
            return () => {
                socket.close();
                setSocket(null);
            }

        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [isAuth]);

    useListenMessagesAndGetBack(socket, sellerId, setConversations)

    let selectedChatDetailForMessageComponent = [sellerDetails]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="600px:w-[400px] mb-10 700px:w-[450px] 1000px:w-[600px] relative max-w-lg bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between p-4 text-white bg-[#ff8f9c] border-b rounded-t-lg">
                    <div>
                        <p className="text-lg font-bold">{sellerDetails.shopName || "Shop Name"}</p>
                        <p className="text-sm font-semibold">{sellerDetails.upi || "upi id"}</p>
                    </div>
                    <button onClick={() => setChatOpen(false)} id="close-chat" className="text-white hover:text-gray-400 focus:outline-none focus:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div
                    className={"messages-container !h-[250px] overflow-y-auto"}
                    onScroll={(e) => handleScroll(e)}
                    ref={containerRef}
                >
                    {conversations.map((message, index) => {
                        const receiver = message.receiver
                        if (receiver === sellerId) {
                            return <MessageSelf
                                message={message}
                                key={index}
                            />;
                        } else {
                            return <MessageOthers
                                selectedChat={selectedChatDetailForMessageComponent}
                                message={message}
                                key={index}
                            />;
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
            </div>
        </div>
    )
}

export default ChatBox