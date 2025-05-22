'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineDashboard, AiOutlineMenu } from 'react-icons/ai';

const Navbar = ({ toggleSidebar }) => {
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await axios.get('http://localhost:5000/api/auth/logout', {
                withCredentials: true,
            });

            toast.success("Logged out successfully!");

            setTimeout(() => {
                router.push('/login');
            }, 1500);
        } catch (error) {
            toast.error("Logout failed. Try again.");
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center">
                <button
                    className="md:hidden mr-2 text-gray-600"
                    onClick={toggleSidebar}
                >
                    <AiOutlineMenu size={20} />
                </button>
                <AiOutlineDashboard className="mr-2 hidden md:block" size={20} />
                <span className="font-medium">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img src="/profile.png" alt="profile" className="w-full h-full object-cover" />
                </div>
                <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                    {loggingOut ? (
                        <span className="animate-spin w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full mr-1"></span>
                    ) : (
                        <FiLogOut className="mr-1" size={16} />
                    )}
                    <span className="hidden md:inline">
                        {loggingOut ? 'Logging out...' : 'Logout'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
