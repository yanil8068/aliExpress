import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../Redux/Authentication/usersSlice";
import cartSlice from "../Redux/features/cartSlice";

// redux store
export default configureStore({
  //all the reducers
  reducer: {
    users: usersReducer,
    allCart: cartSlice,
  },
});
