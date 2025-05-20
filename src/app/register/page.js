"use client";

import { useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const togglePasswordVisibility = () => setShowPassword((v) => !v);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((v) => !v);

    // Eye icon SVGs
    const EyeIcon = ({ open }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            {open ? (
                // Eye open
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            ) : (
                // Eye closed (slash)
                <>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <line
                        x1="3"
                        y1="3"
                        x2="21"
                        y2="21"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </>
            )}
        </svg>
    );

    return (
        <>
            <Navbar />

            <section className="min-h-[80vh] my-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-md w-full bg-white rounded-lg border border-black p-5 space-y-4">
                    <h1 className="text-xl font-extrabold text-gray-900 text-center mb-6">
                        Create Your Account
                    </h1>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Your username"
                                className="w-full px-4 py-1 border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#079DB6] focus:border-transparent
                transition duration-300 ease-in-out rounded-full"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-1 border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#079DB6] focus:border-transparent
                transition duration-300 ease-in-out rounded-full"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full px-4 py-1 border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#079DB6] focus:border-transparent
                transition duration-300 ease-in-out rounded-full pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-[#079DB6]"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <EyeIcon open={showPassword} />
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Confirm Password
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full px-4 py-1 border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#079DB6] focus:border-transparent
                transition duration-300 ease-in-out rounded-full pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-[#079DB6]"
                                tabIndex={-1}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                <EyeIcon open={showConfirmPassword} />
                            </button>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center space-x-2">
                            <input
                                id="agree"
                                name="agree"
                                type="checkbox"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="h-5 w-5 text-[#079DB6] focus:ring-[#079DB6] border-gray-300 rounded transition duration-200"
                                required
                            />
                            <label
                                htmlFor="agree"
                                className="text-sm text-gray-700 select-none"
                            >
                                I agree to the{" "}
                                <Link href="/terms" className="text-[#079DB6] hover:underline">
                                    TERMS
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-[#079DB6] hover:underline">
                                    Privacy Policies
                                </Link>
                            </label>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={!formData.agree}
                            className={`w-full py-1 rounded-full text-white font-semibold
                transition duration-300 ease-in-out
                ${formData.agree ? "bg-[#079DB6] hover:bg-[#057a8a]" : "bg-gray-400 cursor-not-allowed"}
              `}
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Already have account */}
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#079DB6] hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
}
