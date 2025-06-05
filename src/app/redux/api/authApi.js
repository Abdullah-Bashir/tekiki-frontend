import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
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
            transformResponse: (response) => {
                // Store token in localStorage upon successful login
                if (response.token) {
                    localStorage.setItem('token', response.token);
                }
                return response;
            },
        }),

        // Validate Token
        validateToken: builder.query({
            query: () => '/validate-token',
            transformResponse: (response) => response,
            refetchOnMountOrArgChange: true,
        }),

        // Logout User
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            transformResponse: (response) => {
                // Remove token from localStorage upon logout
                localStorage.removeItem('token');
                return response;
            },
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
            transformResponse: (response) => {
                // Store new token in localStorage after password reset
                if (response.token) {
                    localStorage.setItem('token', response.token);
                }
                return response;
            },
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