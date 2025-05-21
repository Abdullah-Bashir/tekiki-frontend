'use client'
import React from 'react';
import { FiHome, FiUser, FiFileText, FiX } from 'react-icons/fi';
import SidebarItem from './SidebarItem';

const Sidebar = ({ activeComponent, setActiveComponent, mobileSidebarOpen, setMobileSidebarOpen }) => {
    const handleItemClick = (component) => {
        setActiveComponent(component);
        // Close sidebar in mobile view when item is clicked
        if (window.innerWidth < 768) {
            setMobileSidebarOpen(false);
        }
    };

    return (
        <div className={`fixed md:relative z-30 w-64 h-full bg-white shadow-lg transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                {/* Close button for mobile */}
                <button
                    className="md:hidden text-gray-500 hover:text-gray-700"
                    onClick={() => setMobileSidebarOpen(false)}
                >
                    <FiX size={24} />
                </button>
            </div>
            <nav className="mt-6">
                <SidebarItem
                    icon={<FiHome className="mr-3" size={20} />}
                    text="Overview"
                    active={activeComponent === 'overview'}
                    onClick={() => handleItemClick('overview')}
                />
                <SidebarItem
                    icon={<FiUser className="mr-3" size={20} />}
                    text="Profile Page"
                    active={activeComponent === 'profile'}
                    onClick={() => handleItemClick('profile')}
                />
                <SidebarItem
                    icon={<FiFileText className="mr-3" size={20} />}
                    text="My Applications"
                    active={activeComponent === 'applications'}
                    onClick={() => handleItemClick('applications')}
                />
            </nav>
        </div>
    );
};

export default Sidebar;