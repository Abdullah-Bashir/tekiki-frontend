"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useValidateTokenQuery } from '@/app/redux/api/authApi';
import AdminSidebar from '@/app/admin/components/AdminSidebar';
import AdminNavbar from '@/app/admin/components/AdminNavbar';
import AdminOverview from '@/app/admin/components/AdminOverview';
import ManageUsers from '@/app/admin/components/ManageUsers';
import ManageApplications from '@/app/admin/components/AdminApplications';
import Loader from '@/app/components/Loader';
import ManageServices from './components/ManageServices';

function AdminDashboard() {
    const router = useRouter();
    const [activeComponent, setActiveComponent] = useState('overview');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Validate token and check admin role
    const { data, isLoading, isError } = useValidateTokenQuery();

    useEffect(() => {
        if (!isLoading) {
            if (isError || !data?.user) {
                // Redirect to login if not authenticated
                router.push('/login');
            } else if (data.user.role !== 'admin') {
                // Redirect to dashboard if not admin
                router.push('/dashboard');
            } else {
                // User is authenticated admin
                setIsAuthorized(true);
            }
        }
    }, [data, isLoading, isError, router]);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'overview':
                return <AdminOverview setActiveComponent={setActiveComponent} />;
            case 'users':
                return <ManageUsers />;
            case 'applications':
                return <ManageApplications />;
            case 'services':
                return <ManageServices />;
            default:
                return <AdminOverview setActiveComponent={setActiveComponent} />;
        }
    };

    // Show loader while checking authorization
    if (isLoading || !isAuthorized) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-gray-100">

            {/* Sidebar */}
            <AdminSidebar
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
                <AdminNavbar toggleSidebar={toggleSidebar} />

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;