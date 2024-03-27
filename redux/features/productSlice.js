import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    likedProducts: [],
}

export const productSlice = createSlice({
    name: 'products',
    initialState: initialValue,
    reducers: {
        setLikedProducts: (state, action) =>{
            state.likedProducts = action.payload.products;
        },
        removeLikedProducts: (state, action) =>{
            const {id} = action.payload;
            state.likedProducts = state.likedProducts.filter(likedProduct => likedProduct._id!==id)
        },
        addLikedProducts: (state, action) =>{
            const {product} = action.payload;
            state.likedProducts.push(product);
        },
    }
})

export const { setLikedProducts, removeLikedProducts, addLikedProducts } = productSlice.actions

export default productSlice.reducer
