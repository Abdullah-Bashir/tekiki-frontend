'use client';
import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const InputField = ({ icon: Icon, type, placeholder }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
        <input
            type={type}
            placeholder={placeholder}
            className="w-full pl-10 pr-3 py-2 rounded outline-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#079DB6] transition-all"
        />
    </div>
);

const Profile = () => {
    const [files, setFiles] = useState([]);

    const handleFileUpload = (e) => {
        setFiles([...e.target.files]);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Personal Information</h2>
            <form className="bg-white p-6 rounded-lg shadow-md space-y-6">

                {/* Row 1: Firstname and Lastname */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField icon={FaUser} type="text" placeholder="First Name" />
                    <InputField icon={FaUser} type="text" placeholder="Last Name" />
                </div>

                {/* Row 2: Email */}
                <InputField icon={FaEnvelope} type="email" placeholder="Email" />

                {/* Row 3: Change Password Heading */}
                <h3 className="text-xl font-semibold pt-4">Change Password</h3>

                {/* Row 4: Current and New Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField icon={FaLock} type="password" placeholder="Current Password" />
                    <InputField icon={FaLock} type="password" placeholder="New Password" />
                </div>

                {/* Row 5: Confirm Password */}
                <InputField icon={FaLock} type="password" placeholder="Confirm Password" />

                {/* CV Upload */}
                <div className="pt-2">
                    <label className="block mb-3 text-gray-700">Upload CV:</label>
                    <label className="flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#079DB6] transition-colors cursor-pointer bg-gray-50">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx"
                        />
                        <div className="text-center p-4 flex flex-col items-center">
                            <MdOutlineFileUpload className="text-3xl mb-3 text-[#079DB6]" />
                            <p className="text-gray-500 text-sm">
                                Drag and drop files here, or click to browse
                            </p>
                            <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX (Max. 5MB)</p>
                            {files.length > 0 && (
                                <p className="text-sm text-green-600 mt-2">
                                    {files.length} file(s) selected
                                </p>
                            )}
                        </div>
                    </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-[#079DB6] text-white py-3 rounded-lg hover:bg-[#068a9f] transition-colors font-medium"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;