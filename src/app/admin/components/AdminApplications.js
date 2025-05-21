'use client'
import React, { useState } from 'react';
import { FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi';

const ManageApplications = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample applications data - replace with real data from your API
    const applications = [
        { id: 1, name: 'John Doe', service: 'Web Development', date: '2023-05-15', status: 'Approved' },
        { id: 2, name: 'Jane Smith', service: 'Graphic Design', date: '2023-06-20', status: 'Pending' },
        { id: 3, name: 'Bob Johnson', service: 'Content Writing', date: '2023-07-10', status: 'Rejected' },
        { id: 4, name: 'Alice Brown', service: 'SEO Optimization', date: '2023-08-05', status: 'Pending' },
    ];

    const filteredApplications = applications.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusChange = (id, newStatus) => {
        // In a real app, you would make an API call here
        console.log(`Changing application ${id} status to ${newStatus}`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Manage Applications</h2>

            {/* Search Bar */}
            <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search applications..."
                    className="w-full pl-10 pr-3 py-2 rounded outline-none bg-white focus:bg-white focus:ring-2 focus:ring-[#079DB6] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Applicant
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Service
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApplications.map((app) => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {app.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {app.service}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {app.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        onClick={() => console.log(`Viewing application ${app.id}`)}
                                    >
                                        <FiEye />
                                    </button>
                                    {app.status === 'Pending' && (
                                        <>
                                            <button
                                                className="text-green-600 hover:text-green-900"
                                                onClick={() => handleStatusChange(app.id, 'Approved')}
                                            >
                                                <FiCheck />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleStatusChange(app.id, 'Rejected')}
                                            >
                                                <FiX />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageApplications;