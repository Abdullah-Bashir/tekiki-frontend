'use client'
import React, { useState } from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';
import Navbar from '@/app/dashboard/components/Navbar';
import Overview from '@/app/dashboard/components/Overview';
import Profile from '@/app/dashboard/components/Profile';
import Applications from '@/app/dashboard/components/Applications'

function Dashboard() {
    const [activeComponent, setActiveComponent] = useState('overview');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'overview':
                return <Overview setActiveComponent={setActiveComponent} />;;
            case 'profile':
                return <Profile />;
            case 'applications':
                return <Applications />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="flex h-screen w-full bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                mobileSidebarOpen={mobileSidebarOpen}
                setMobileSidebarOpen={setMobileSidebarOpen}
            />

            {/* Add overlay when sidebar is open on mobile */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-white/30 z-20 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}


            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;