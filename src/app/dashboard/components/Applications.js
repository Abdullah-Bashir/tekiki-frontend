'use client';
import React from 'react';

const Applications = () => {
    const applications = [
        { id: 1, service: 'Web Development', date: '2023-05-15', status: 'Approved' },
        { id: 2, service: 'Graphic Design', date: '2023-06-20', status: 'Pending' },
        { id: 3, service: 'Content Writing', date: '2023-07-10', status: 'Rejected' },
        { id: 4, service: 'SEO Optimization', date: '2023-08-05', status: 'Pending' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-2">
            <h2 className="text-3xl font-semibold mb-6">My Applications</h2>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((app) => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="text-blue-600 hover:text-blue-900">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applications;
