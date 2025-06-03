import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { updateService, deleteService } from '@/app/redux/api/serviceSlice';
import EditServiceModal from '@/app/admin/components/EditServiceModal';
import { toast } from 'react-toastify';
import Loader from '@/app/components/Loader';

const ServicesTable = () => {

    const dispatch = useDispatch();

    const {
        services = [],
        loading: servicesLoading,
        error: servicesError
    } = useSelector((state) => state.service || {});

    const [editingService, setEditingService] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handleEdit = (service) => {
        setEditingService(service);
    };

    // In your handleSave function in ServicesTable.js
    const handleSave = async (formData) => {
        try {
            const result = await dispatch(updateService({
                id: editingService._id,
                formData
            })).unwrap();

            // Verify the response contains the updated service
            if (!result || !result._id) {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Update error:', error);
            const errorMessage = error?.data?.error || error?.message || 'Failed to update service';
            toast.error(errorMessage);
            throw error;
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await dispatch(deleteService(id)).unwrap();
            toast.success('Service deleted successfully');
        } catch (error) {
            toast.error(error.message || 'Failed to delete service');
        } finally {
            setDeletingId(null);
        }
    };

    if (servicesLoading) {
        return <Loader />
    }

    if (servicesError) {
        return <div className="text-center py-4 text-red-500">
            Error loading services: {servicesError}
        </div>;
    }

    if (!services.length) {
        return <div className="text-center py-4">No services found.</div>;
    }

    return (
        <div className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">All Services</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">

                    {/* Table header remains same */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Media
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Docs
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Interviews
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {services.map((service) => (
                            <tr key={service._id}>

                                {/* Table cells remain same */}
                                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                    {service.serviceName}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
                                    {service.description}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 text-center">
                                    {service.media?.length || 0}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 text-center">
                                    {service.documents?.length || 0}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 text-center">
                                    {service.interviewDates?.length || 0}
                                </td>


                                <td className="px-4 py-4 text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                            title="Edit"
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded"
                                            title="Delete"
                                            disabled={deletingId === service._id}
                                        >
                                            {deletingId === service._id ? (
                                                <span className="animate-pulse">...</span>
                                            ) : (
                                                <FiTrash2 />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {editingService && (
                <EditServiceModal
                    service={editingService}
                    onClose={() => setEditingService(null)}
                    onSave={handleSave}
                />
            )}

        </div>
    );
};

export default ServicesTable;