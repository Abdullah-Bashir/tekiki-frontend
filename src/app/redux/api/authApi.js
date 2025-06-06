import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    // Add tag types for cache invalidation
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        // Signup/Register User
        signupUser: builder.mutation({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Login User
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                }
                return response;
            },
            invalidatesTags: ['Auth'],
        }),

        // Validate Token
        validateToken: builder.query({
            query: () => '/validate-token',
            transformResponse: (response) => response,
            providesTags: ['Auth'],
            // Force refetch when the query is executed
            refetchOnMountOrArgChange: true,
        }),

        // Logout User
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            transformResponse: (response) => {
                localStorage.removeItem('token');
                return response;
            },
            // Clear all auth-related cache
            invalidatesTags: ['Auth'],
            // Force all queries to refetch
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(authApi.util.resetApiState()); // Reset entire API state
                } catch (error) {
                    console.error('Logout error:', error);
                }
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
                if (response.token) {
                    localStorage.setItem('token', response.token);
                }
                return response;
            },
            invalidatesTags: ['Auth'],
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