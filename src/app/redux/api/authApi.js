import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "http://localhost:5000/api/auth";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        // 1️⃣ Register User
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),

        // 3️⃣ Login User
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // 5️⃣ Validate Token
        validateToken: builder.query({
            query: () => ({
                url: '/validate-token',
                method: 'GET',
            }),
        }),
    }),
});

// Export auto-generated hooks
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useValidateTokenQuery,
} = authApi;
