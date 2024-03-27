import { addMessage, updateLastMessageBySellerId } from "../../../redux/features/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 


const useListenMessages = (socket) => {
    
    const conversations = useSelector(state=>state.chat.conversations)
    const selectedChat = useSelector(state=>state.chat.selectedChat)
    const lastMessages = useSelector(state=>state.chat.lastMessages)
    const dispatch = useDispatch();
    const sellerId = selectedChat[0]._id

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log(newMessage, lastMessages)
            if (newMessage.sender === sellerId) {
                dispatch(addMessage(newMessage))
            }
            dispatch(updateLastMessageBySellerId(newMessage))
        });

        return () => socket?.off("newMessage");
    }, [socket, sellerId, conversations]);
};
export default useListenMessages;