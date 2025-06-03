// src/app/admin/components/ManageServices.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchServices } from '@/app/redux/api/serviceSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServicesTable from '@/app/admin/components/ServicesTable';
import AddServicePopup from '@/app/admin/components/AddServicePopup';

function ManageServices() {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleServiceCreated = () => {
        dispatch(fetchServices());
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header with button aligned right */}
            <div className="flex items-center justify-between mt-4 mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Service Management</h1>
                    <p className="text-gray-600 text-sm">Create new services with all necessary details</p>
                </div>
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-[#079DB6] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                    Add Service
                </button>
            </div>

            <ServicesTable className="mt-6" />

            {showPopup && (
                <AddServicePopup
                    onClose={() => setShowPopup(false)}
                    onSuccess={handleServiceCreated}
                />
            )}
        </div>
    );
}

export default ManageServices;
