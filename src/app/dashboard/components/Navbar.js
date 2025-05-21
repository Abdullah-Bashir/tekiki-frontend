'use client'
import React from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { AiOutlineDashboard, AiOutlineMenu } from 'react-icons/ai';

const Navbar = ({ toggleSidebar }) => {
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
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <img src="/profile.png" alt="" />                </div>
                <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <FiLogOut className="mr-1" size={16} />
                    <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;