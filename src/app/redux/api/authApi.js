import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({

        // Signup/Register User
        signupUser: builder.mutation({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                body: userData,
            }),
        }),

        // Login User
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => response.user,
        }),

        validateToken: builder.query({
            query: () => '/validate-token',
            // Keep the full response
            transformResponse: (response) => response,
            // Force refetch in certain situations
            refetchOnMountOrArgChange: true,
        }),

        // Logout User
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
        }),

        // Forgot Password
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),

        // Reset Password
        resetPassword: builder.mutation({
            query: ({ token, newPassword, confirmPassword }) => ({
                url: `/reset-password/${token}`,
                method: 'PUT',
                body: { newPassword, confirmPassword },
            }),
        }),
    }),
});

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useValidateTokenQuery,
    useLogoutUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;