"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useResetPasswordMutation } from "@/app/redux/api/authApi";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { token } = useParams();

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            return toast.warn("Please fill in all fields.");
        }

        if (newPassword !== confirmPassword) {
            return toast.warn("Passwords do not match.");
        }

        try {
            await resetPassword({
                token: Array.isArray(token) ? token[0] : token,
                newPassword,
                confirmPassword
            }).unwrap();

            toast.success("Password reset successfully! You can now login with your new password.");

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            toast.error(err?.data?.message || "Password reset failed. The link may be invalid or expired.");
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 border p-6 rounded-xl shadow-lg">
                    <h2 className="text-center text-2xl font-bold">Reset Your Password</h2>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <label htmlFor="newPassword" className="block text-sm font-medium">
                                    New Password
                                </label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-1 px-4 rounded-full shadow-sm text-white bg-[#079DB6] hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>

                        <div className="text-sm text-center">
                            Remember your password?{" "}
                            <Link href="/login" className="text-[#079DB6] hover:underline">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}