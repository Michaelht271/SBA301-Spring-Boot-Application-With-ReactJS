import { configureStore } from "@reduxjs/toolkit";
import { orchidApiSlice } from "./api/orchidApiSlice";

export const store = configureStore({
    reducer: {
        [orchidApiSlice.reducerPath]: orchidApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(orchidApiSlice.middleware),
});
