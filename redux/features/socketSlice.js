import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null,
    messages: [],
};

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state,action) =>{
            return {
                ...state,
                socket: action.payload
            }
        },
        sendMessage: (state, action) => {
            return {
                ...state,
                messages: [action.payload.message, ...state.messages],
            };
        },
        receiveMessage: (state, action) => {
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
            };
        }
    }
});

export const { sendMessage, receiveMessage, setSocket } = socketSlice.actions;
export default socketSlice.reducer;
