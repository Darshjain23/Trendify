import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (!isExist) {
        state.products.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
    clearWishlist: (state) => {
      state.products = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
