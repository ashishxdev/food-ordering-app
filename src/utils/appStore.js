import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
 
const appStore = configureStore({
    // This is our whole app reduce
    reducer: {
        cart: cartReducer,
        // user: useReducer
    }
});

export default appStore;
