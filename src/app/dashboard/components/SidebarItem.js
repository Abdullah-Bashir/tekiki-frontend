'use client'
import React from 'react';

const SidebarItem = ({ icon, text, active, onClick }) => {
    return (
        <button
            className={`flex items-center w-full px-6 py-4 text-left transition-colors duration-200 ${active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={onClick}
        >
            {icon}
            <span className="font-medium ml-3">{text}</span>
        </button>
    );
};

export default SidebarItem;