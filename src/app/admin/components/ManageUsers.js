'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiUserPlus, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllUsers,
    deleteUserById,
    editUserById,
    resetAdminUserState
} from '@/app/redux/api/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: '',
        email: '',
        role: 'user'
    });

    const dispatch = useDispatch();
    const { users, loading, error, success } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchAllUsers());
        return () => {
            dispatch(resetAdminUserState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            toast.success(success);
            setTimeout(() => dispatch(resetAdminUserState()), 3000);
        }
        if (error) {
            toast.error(error.message || error);
            dispatch(resetAdminUserState());
        }
    }, [success, error, dispatch]);

    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUserById(userId));
        }
    };

    const handleEditClick = (user) => {
        setCurrentUser(user);
        setEditForm({
            username: user.username,
            email: user.email,
            role: user.role
        });
        setEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(
            editUserById({
                userId: currentUser._id,
                userData: editForm
            })
        );
        setEditModalOpen(false);
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-2">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h2 className="text-3xl font-bold">Manage Users</h2>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-3 py-2 rounded-md outline-none bg-white border border-gray-300 focus:ring-2 focus:ring-[#079DB6] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Username
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                                            title="Edit"
                                        >
                                            <FiEdit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                                            title="Delete"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm p-2">

                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#079DB6]">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#079DB6]">
                            <h3 className="text-xl font-semibold text-[#079DB6]">Edit User</h3>
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="text-[#079DB6] hover:text-white hover:bg-[#079DB6] p-1 rounded-full transition-all">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleEditSubmit} className="px-6 py-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#079DB6] mb-1">Username</label>
                                <input
                                    type="text"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-[#079DB6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#079DB6]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#079DB6] mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-[#079DB6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#079DB6]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#079DB6] mb-1">Role</label>
                                <select
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-[#079DB6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#079DB6]"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 rounded-full bg-[#079DB6] text-white font-semibold hover:bg-[#067f91] transition-all"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}



        </div>
    );
};

export default ManageUsers;