'use client';
import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', applications: 5 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', applications: 3 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', applications: 1 },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', applications: 4 },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-2">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h2 className="text-3xl font-semibold">Manage Users</h2>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-3 py-2 rounded outline-none bg-white focus:bg-white focus:ring-2 focus:ring-[#079DB6] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Applications</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{user.applications}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <img src="edit.png" alt="" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <img src="delete.png" alt="" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
