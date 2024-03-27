import { useEffect } from "react";

const useListenMessagesAndGetBack = (socket, sellerId, setConversations) => {

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            if (newMessage.sender === sellerId) {
                setConversations( prev => [newMessage, ...prev])
            }
        });

        return () => socket?.off("newMessage");
    }, [socket, sellerId]);
};
export default useListenMessagesAndGetBack;