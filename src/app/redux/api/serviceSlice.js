import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/service';

// Helper function for error handling
const handleAsyncThunkError = (err) => {
    return err.response?.data?.message || err.message || 'Something went wrong';
};

// Get all services
export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API_URL);
            return res.data;
        } catch (err) {
            return rejectWithValue(handleAsyncThunkError(err));
        }
    }
);

// Add this to your createAsyncThunk actions
export const fetchServiceById = createAsyncThunk(
    'services/fetchServiceById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(handleAsyncThunkError(err));
        }
    }
);

export const createService = createAsyncThunk(
    'services/createService',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(handleAsyncThunkError(err));
        }
    }
);

// Update a service
export const updateService = createAsyncThunk(
    'services/updateService',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(handleAsyncThunkError(err));
        }
    }
);

// Delete a service
export const deleteService = createAsyncThunk(
    'services/deleteService',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(handleAsyncThunkError(err));
        }
    }
);

// Slice
const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        loading: false,
        error: null,
        currentService: null,
        success: null
    },
    reducers: {
        resetServiceState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(createService.pending, (state) => {
                state.loading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.loading = false;
                state.services.push(action.payload);
                state.success = "Service created successfully";
            })
            .addCase(createService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(updateService.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = state.services.map(service =>
                    service._id === action.payload._id ? action.payload : service
                );
                state.success = "Service updated successfully";
            })
            .addCase(updateService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(deleteService.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = state.services.filter(service => service._id !== action.payload);
                state.success = "Service deleted successfully";
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Then add the case to your extraReducers
            .addCase(fetchServiceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServiceById.fulfilled, (state, action) => {
                state.loading = false;
                // You might want to store the single service in your state
                state.currentService = action.payload;
            })
            .addCase(fetchServiceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


    }
});

export const { resetServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;