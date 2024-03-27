import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    isAuth: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialValue,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload
            state.isAuth = true
        },
        setLogout: () => initialValue,
        addProductToWishlist: (state, action) => {
            if (state.isAuth && state.user) {
                state.user.wishlist.push(action.payload.id);
            }
            return state
        },
        removeProductFromWishlist: (state, action) => {
            if (state.isAuth && state.user) {
                state.user.wishlist = state.user.wishlist.filter(itemId => itemId !== action.payload.id);
            }
        },
    }
})

export const { setLogin, setLogout, addProductToWishlist, removeProductFromWishlist} = authSlice.actions

export default authSlice.reducer
