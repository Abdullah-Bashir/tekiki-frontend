import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import userReducer from "./api/userSlice"; // This will contain our async thunks

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        // Add your user slice with async thunks
        user: userReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, etc.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;