"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "../components/Footer";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.warn("Please fill in all fields.");
        }

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            const { role } = res.data.user;

            toast.success("Login successful!");

            if (role === "admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Invalid credentials.");
            } else {
                toast.error("Server error. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 border p-6 rounded-xl shadow-lg">
                    <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium">
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
                                <Link href="/forgot-password" className="text-sm text-[#079DB6] hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-1 px-4 rounded-full shadow-sm text-white bg-[#079DB6] hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </button>

                        <div className="text-sm text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-[#079DB6] hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
