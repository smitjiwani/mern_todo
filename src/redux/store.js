import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";

export const store = configureStore({
    reducer: todoReducer,
    devTools: false
});

export default store;