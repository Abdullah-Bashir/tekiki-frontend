"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "@/app/components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useSignupUserMutation } from "@/app/redux/api/authApi"; // Adjust the path as needed

export default function Signup() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [signupUser, { isLoading }] = useSignupUserMutation();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword, terms } = formData;

        if (!username || !email || !password || !confirmPassword) {
            toast.error("Please fill all the fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!terms) {
            toast.error("You must agree to the terms");
            return;
        }

        try {
            const res = await signupUser({ username, email, password }).unwrap();

            toast.success(res.message || "Signup successful");

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: false,
            });

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            toast.error(err?.data?.message || "Signup failed");
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full space-y-8 border p-6 rounded-xl shadow-lg">
                    <div>
                        <h2 className="text-center text-2xl font-bold">Create your account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                                    value={formData.username}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.password}
                                    onChange={handleChange}
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
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
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
                                    checked={formData.terms}
                                    onChange={handleChange}
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
                                disabled={isLoading}
                                className="w-full flex justify-center py-1 px-4 border border-transparent rounded-full shadow-sm text-white bg-[#079DB6] hover:bg-blue-700 focus:outline-none"
                            >
                                {isLoading ? "Signing up..." : "Sign up"}
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
