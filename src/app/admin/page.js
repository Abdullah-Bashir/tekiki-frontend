
"use client"
// export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminSidebar from '@/app/admin/components/AdminSidebar';
import AdminNavbar from '@/app/admin/components/AdminNavbar';
import AdminOverview from '@/app/admin/components/AdminOverview';
import ManageUsers from '@/app/admin/components/ManageUsers';
import ManageApplications from '@/app/admin/components/AdminApplications';

function AdminDashboard() {
    const searchParams = useSearchParams();
    const [activeComponent, setActiveComponent] = useState('overview');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Sync with URL parameters
    useEffect(() => {
        const view = searchParams.get('view');
        if (view && ['overview', 'users', 'applications'].includes(view)) {
            setActiveComponent(view);
        }
    }, [searchParams]);

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
            default:
                return <AdminOverview setActiveComponent={setActiveComponent} />;
        }
    };

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