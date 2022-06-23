import { createSlice } from "@reduxjs/toolkit";
const items  = [ ]

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: items,
    totalQuantity: 0
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItems = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if(!existingItems) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItems.quantity++;
        existingItems.totalPrice = existingItems.totalPrice + newItem.price;
      }
    },
    removeItems(state, action) {
      const newItem = action.payload;
      const existingItems = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity--;
        if(existingItems) {
          if(existingItems.quantity >= 1 ) {
            existingItems.quantity--;
            existingItems.totalPrice = existingItems.totalPrice - newItem.price;
          }
          if(existingItems.quantity === 0) {
            state.items = state.items.filter((item) => item.id !== newItem.id)
          }
        }
    },

  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;