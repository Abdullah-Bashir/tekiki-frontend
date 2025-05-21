'use client'
import React from 'react';
import { FiUsers, FiFileText } from 'react-icons/fi';

const AdminOverview = ({ setActiveComponent }) => {
    const quickActions = [
        {
            title: 'Manage Users',
            description: 'View, edit, and manage all user accounts',
            icon: <img src="./profile.png" width={40} alt="" />,
            action: () => setActiveComponent('users')
        },
        {
            title: 'Manage Applications',
            description: 'Review and process all applications',
            icon: <img src="./application.png" width={40} alt="" />,
            action: () => setActiveComponent('applications')
        }
    ];

    return (
        <div className="p-4 sm:p-6 animate-fadeIn">
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                {quickActions.map((item, index) => (
                    <div
                        key={index}
                        onClick={item.action}
                        className="w-full sm:flex-1 cursor-pointer transition-all hover:scale-105 bg-white rounded-lg shadow-sm p-5 flex items-start gap-4 max-w-[400px]"
                    >
                        <div>{item.icon}</div>
                        <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOverview;