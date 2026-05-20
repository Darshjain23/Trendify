import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  products: any;
  selectedItems: any;
  totalPrice: any;
  tax: any;
  taxRate: any;
  grandTotal: any;
}

const initialState: CounterState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: any) => {
      const isExist = state.products.find(
        (product: any) => product._id === action.payload._id
      );

      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Item is already added");
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrantTotal(state);
    },
    updateQuantity: (state: any, action: any) => {
      const products = state.products.map((product: any) => {
        if (product._id === action.payload._id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === "decrement") {
            if (product.quantity > 1) {
              product.quantity -= 1;
            }
          }
        }
        return product;
      });
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrantTotal(state);
    },
    removeFromCart: (state: any, action: any) => {
      state.products = state.products?.filter(
        (product: any) => product?._id !== action.payload._id
      );
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrantTotal(state);
    },
    clearCart: (state: any) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const setSelectedItems = (state: any) =>
  state.products.reduce((total: any, product: any) => {
    return Number(total + product.quantity);
  }, 0);

export const setTotalPrice = (state: any) =>
  state.products.reduce((total: any, product: any) => {
    return Number(total + product.quantity * product.price);
  }, 0);

export const setTax = (state: any) => setTotalPrice(state) * state.taxRate;

export const setGrantTotal = (state: any) => {
  return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
};

export const { addToCart, updateQuantity, removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
