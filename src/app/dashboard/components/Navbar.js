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
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                withCredentials: true,
            });

            toast.success("Logged out successfully!");

            setTimeout(() => {
                window.location.href = "/login";
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

                {/* Desktop only button */}
                <div className="hidden md:block">
                    <button
                        onClick={() => router.push('/services')}
                        className="bg-[#079DB6] cursor-pointer text-white px-2 py-1 rounded-md hover:bg-[#068aa1] transition duration-200"
                    >
                        Create New Application
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex items-center rounded-md cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-300 p-1 transition-colors duration-200 relative"
                >
                    <FiLogOut className="mr-1" size={16} />
                    <span className="hidden md:inline">
                        {loggingOut ? 'Logging out...' : 'Logout'}
                    </span>
                    {loggingOut && (
                        <span className="absolute right-[-20px] md:right-[-24px] top-1/2 transform -translate-y-1/2">
                            <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin inline-block"></span>
                        </span>
                    )}
                </button>


            </div>
        </div>
    );
};

export default Navbar;
