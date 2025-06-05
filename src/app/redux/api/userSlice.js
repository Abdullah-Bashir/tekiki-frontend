import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get all users (admin only)
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/all`, getAuthHeaders());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to fetch users');
        }
    }
);

// Delete a user
export const deleteUserById = createAsyncThunk(
    'admin/deleteUserById',
    async (userId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${userId}`, getAuthHeaders());
            return userId;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to delete user');
        }
    }
);

// Edit a user
export const editUserById = createAsyncThunk(
    'admin/editUserById',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                `${API_URL}/${userId}`,
                userData,
                getAuthHeaders()
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to update user');
        }
    }
);

const adminUserSlice = createSlice({
    name: 'adminUsers',
    initialState: {
        users: [],
        loading: false,
        error: null,
        success: null,
    },
    reducers: {
        resetAdminUserState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {

        builder

            // Get All Users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete User
            .addCase(deleteUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload);
                state.success = 'User deleted successfully';
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Edit User
            .addCase(editUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) =>
                    user._id === action.payload._id ? action.payload : user
                );
                state.success = 'User updated successfully';
            })
            .addCase(editUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { resetAdminUserState } = adminUserSlice.actions;
export default adminUserSlice.reducer;