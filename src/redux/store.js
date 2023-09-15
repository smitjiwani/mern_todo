import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

export const store = configureStore({
    reducer: todoReducer,
    devTools: false
});

export default store;