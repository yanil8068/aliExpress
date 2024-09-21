import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

// card slice
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      console.log("action", action);
      //mapping through all items in cart and checking if any item in cart have same id as id of item coming from payload,
      const IteamIndex = state.carts.findIndex(
        (iteam) => iteam.id === action.payload.id
      );
      //if item already exist i cart then only increment quantity of that item else add the entire item in cart
      if (IteamIndex >= 0) {
        state.carts[IteamIndex].quantity += 1;
      } else {
        const temp = { ...action.payload, quantity: 1 };
        state.carts = [...state.carts, temp];
      }
    },

    // remove perticular iteams
    //we are sending id of item in payload and then looping from all items in cart and checking if any item in cart have that id , it returns all items except those items whos id is matched with payload, so it removed the item from the cart
    removeToCart: (state, action) => {
      const data = state.carts.filter((ele) => ele.id !== action.payload);
      state.carts = data;
    },

    // remove single iteams
    removeSingleIteams: (state, action) => {
      const IteamIndex_dec = state.carts.findIndex(
        (iteam) => iteam.id === action.payload.id
      );

      if (state.carts[IteamIndex_dec].quantity >= 1) {
        state.carts[IteamIndex_dec].quantity -= 1;
      }
    },

    // clear cart
    emptycartIteam: (state, action) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeToCart, removeSingleIteams, emptycartIteam } =
  cartSlice.actions;

export default cartSlice.reducer;
