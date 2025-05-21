"use client";

import { useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 border p-6 rounded-xl shadow-lg">
                    <div>
                        <h2 className="text-center text-2xl font-bold">Create your account</h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
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
                                <label htmlFor="confirm-password" className="block text-sm font-medium">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    className="w-full px-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-[#079DB6] focus:ring-[#079DB6] border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the{" "}
                                    <a href="/terms" className="text-[#079DB6] hover:underline">
                                        Terms of Services
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacy" className="text-[#079DB6] hover:underline">
                                        Privacy Policies
                                    </a>.
                                </label>
                            </div>


                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full cursor-pointer flex justify-center py-1 px-4 border border-transparent rounded-full shadow-sm text-white bg-[#079DB6] hover:bg-blue-700 focus:outline-none"
                            >
                                Sign up
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#079DB6] hover:underline">
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
