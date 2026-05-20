import { createSlice } from "@reduxjs/toolkit";

export interface WishlistState {
  products: any[];
}

const initialState: WishlistState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state: any, action: any) => {
      const isExist = state.products.find(
        (product: any) => product._id === action.payload._id
      );
      if (!isExist) {
        state.products.push(action.payload);
      }
    },
    removeFromWishlist: (state: any, action: any) => {
      state.products = state.products.filter(
        (product: any) => product._id !== action.payload._id
      );
    },
    clearWishlist: (state: any) => {
      state.products = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
