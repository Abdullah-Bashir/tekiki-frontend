'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useValidateTokenQuery } from '@/app/redux/api/authApi';

import Sidebar from '@/app/dashboard/components/Sidebar';
import Navbar from '@/app/dashboard/components/Navbar';
import Overview from '@/app/dashboard/components/Overview';
import Profile from '@/app/dashboard/components/Profile';
import Applications from '@/app/dashboard/components/Applications';

import Loader from '../components/Loader';

function Dashboard() {

    const router = useRouter();

    const [activeComponent, setActiveComponent] = useState('overview');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Validate token query
    const { data, isLoading, isError } = useValidateTokenQuery();

    useEffect(() => {
        if (!isLoading) {
            if (isError || !data?.user) {
                // Add a small delay to ensure token is properly set
                const timer = setTimeout(() => {
                    router.push('/login');
                }, 100);
                return () => clearTimeout(timer);
            } else {
                setIsAuthenticated(true);
            }
        }
    }, [data, isLoading, isError, router]);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'overview':
                return <Overview setActiveComponent={setActiveComponent} />;
            case 'profile':
                return <Profile />;
            case 'applications':
                return <Applications />;
            default:
                return <Overview />;
        }
    };

    // Show loader while checking authentication
    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

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