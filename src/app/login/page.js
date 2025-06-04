
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginUserMutation, useForgotPasswordMutation } from "@/app/redux/api/authApi";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const router = useRouter();

    const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
    const [forgotPassword, { isLoading: isSendingReset }] = useForgotPasswordMutation();


    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.warn("Please fill in all fields.");

        try {
            const user = await loginUser({ email, password }).unwrap();
            toast.success("Login successful!");

            // Critical fix - Wait for cookie to be SET and PERSISTED
            await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 sec delay

            // Force full page reload to reset all auth states
            if (user.role === "admin") {
                window.location.href = "/admin"; // FULL reload, not router.push()
            } else {
                window.location.href = "/dashboard";
            }

        } catch (err) {
            toast.error(err?.data?.message || "Invalid credentials.");
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.warn("Please enter your email address.");
        }

        try {
            await forgotPassword(email).unwrap();
            toast.success("Password reset email sent. Please check your inbox.");
            setShowForgotPassword(false);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to send reset email.");
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full space-y-8 border p-6 rounded-xl shadow-lg">
                    {showForgotPassword ? (
                        <>
                            <h2 className="text-center text-2xl font-bold">Reset Password</h2>
                            <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSendingReset}
                                    className="w-full flex justify-center items-center py-1 px-4 rounded-full shadow-sm text-white bg-[#079DB6] hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                                >
                                    {isSendingReset ? "Sending..." : "Send Reset Link"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="w-full flex justify-center items-center py-1 px-4 rounded-full shadow-sm text-[#079DB6] border border-[#079DB6] hover:bg-gray-100 focus:outline-none"
                                >
                                    Back to Login
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>
                            <form onSubmit={handleLogin} className="mt-8 space-y-6">
                                <div className="space-y-8">
                                    <div>
                                        <label htmlFor="email" className="block text-sm mb-1 font-medium">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-[#079DB6] border-gray-300 rounded"
                                            />
                                            <span className="ml-2">Remember me</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowForgotPassword(true)}
                                            className="text-sm text-[#079DB6] hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full flex justify-center items-center py-1 px-4 rounded-full shadow-sm text-white bg-[#079DB6] hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                                >
                                    {isLoggingIn ? "Logging in..." : "Log in"}
                                </button>

                                <div className="text-sm text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/signup" className="text-[#079DB6] hover:underline">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}