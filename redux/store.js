"use client"
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'
import productReducer from './features/productSlice'
import socketReducer from './features/socketSlice'
import chatReducer from './features/chatSlice'

const store = configureStore({
    reducer: {
        auth : authReducer,
        products: productReducer,
        socket: socketReducer,
        chat: chatReducer,
    },
    devTools: false,
});

export default store;