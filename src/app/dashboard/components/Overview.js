'use client'
import React from 'react';

const Overview = ({ setActiveComponent }) => (
    <div className="p-4 sm:p-6 animate-fadeIn">
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {/* Card 1 */}
            <div
                onClick={() => setActiveComponent('profile')}
                className="w-full sm:flex-1 cursor-pointer transition-all hover:scale-105 bg-white rounded-lg shadow-sm p-5 flex items-start gap-4 max-w-[400px]"
            >
                <img src="/profile.png" width={40} alt="Profile Icon" />
                <div>
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        Manage your profile, update contact details and upload CV
                    </p>
                </div>
            </div>

            {/* Card 2 */}
            <div
                onClick={() => setActiveComponent('applications')}
                className="w-full sm:flex-1 cursor-pointer transition-all hover:scale-105 bg-white rounded-lg shadow-sm p-5 flex items-start gap-4 max-w-[400px]"
            >
                <img src="/application.png" width={40} alt="Applications Icon" />
                <div>
                    <h3 className="text-lg font-semibold">My Applications</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        View and manage all your submitted applications
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Overview;
