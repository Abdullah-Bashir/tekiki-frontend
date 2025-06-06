'use client'
import React from 'react';
import { FiHome, FiUsers, FiFileText, FiX, FiSettings } from 'react-icons/fi';
import SidebarItem from '@/app/dashboard/components/SidebarItem';

const AdminSidebar = ({ activeComponent, setActiveComponent, mobileSidebarOpen, setMobileSidebarOpen }) => {
    const handleItemClick = (component) => {
        setActiveComponent(component);
        if (window.innerWidth < 768) {
            setMobileSidebarOpen(false);
        }
    };

    return (
        <div className={`fixed md:relative z-30 w-64 h-full bg-white shadow-lg transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
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
                    text="Dashboard"
                    active={activeComponent === 'overview'}
                    onClick={() => handleItemClick('overview')}
                />
                <SidebarItem
                    icon={<FiUsers className="mr-3" size={20} />}
                    text="Manage Users"
                    active={activeComponent === 'users'}
                    onClick={() => handleItemClick('users')}
                />
                <SidebarItem
                    icon={<FiFileText className="mr-3" size={20} />}
                    text="Manage Applications"
                    active={activeComponent === 'applications'}
                    onClick={() => handleItemClick('applications')}
                />
                <SidebarItem
                    icon={<FiSettings className="mr-3" size={20} />}
                    text="Manage Services"
                    active={activeComponent === 'services'}
                    onClick={() => handleItemClick('services')}
                />
            </nav>
        </div>
    );
};

export default AdminSidebar;