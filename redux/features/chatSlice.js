import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations: [],
    sellerId: "",
    sidebarSellers: [],
    lastMessages: [],
    selectedChat: ["", -1],
    refetchChat: true,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setInitialConversations: (state, action) => {
            state.conversations = action.payload;
        },
        addMessage: (state, action) => {
            state.conversations = [
                action.payload,
                ...state.conversations
            ];
        },
        setSidebarSellers: (state, action) => {
            state.sidebarSellers = action.payload
        },
        setLastMessages: (state, action) => {
            state.lastMessages = action.payload
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        },
        // This is by index
        updateLastMessage: (state, action) => {
            const messageContent = action.payload;
            state.lastMessages = state.lastMessages.map((message, i) =>
                i === state.selectedChat[1] ? { ...message, message: messageContent } : message
            );
        },
        // this is by sellerId
        updateLastMessageBySellerId: (state, action) => {
            const newMessage = action.payload;
            console.log(state.lastMessages)
            state.lastMessages = state.lastMessages.map((message, i) =>
            (state.sidebarSellers[i]._id == newMessage.sender
                ? newMessage
                : message
            ))
        },
        addMoreMessages: (state, action) => {
            const messages = action.payload
            state.conversations = [...state.conversations, ...messages]
        },
        messageFromChatBox: (state, action) => {
            const { newMessage, id } = action.payload;
        
            if (state.sidebarSellers.length > 0) {
                const indx = state.sidebarSellers.findIndex(seller => seller._id === id);
        
                if (indx !== -1) {
                    state.lastMessages[indx] = newMessage;
                }
            }
        },
        refetchChat : (state, action) => {
            state.refetchChat = action.payload
        }
    }
});

export const { refetchChat, setInitialConversations, addMessage, setSidebarSellers, setLastMessages, setSelectedChat, updateLastMessage, updateLastMessageBySellerId, addMoreMessages, messageFromChatBox} = chatSlice.actions;
export default chatSlice.reducer;
