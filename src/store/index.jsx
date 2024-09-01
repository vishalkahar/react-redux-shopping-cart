import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import wishListSlice from "./slices/wishListSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "./middleware/api";
import { func } from "./middleware/func";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cartItems: cartSlice,
        wishList: wishListSlice
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), apiMiddleware, func]
})