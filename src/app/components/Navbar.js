
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSpinner, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useValidateTokenQuery, useLogoutUserMutation } from "@/app/redux/api/authApi";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // RTK Query hooks
    const {
        data: authData,
        isLoading,
        isError,
        refetch
    } = useValidateTokenQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();

    // Check authentication status
    const isAuthenticated = authData?.valid === true;
    const userData = authData?.user || null;

    // Animation variants
    const iconHover = {
        scale: 1.2,
        rotate: 10,
        transition: { type: "spring", stiffness: 300 },
    };

    const linkHover = {
        scale: 1.1,
        transition: { duration: 0.3 },
    };

    const underlineVariants = {
        hidden: { width: 0 },
        visible: { width: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        },
        exit: { opacity: 0, y: -20 }
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/contacts", label: "Contact Us" },
        { href: "/about-us", label: "About Us" },
    ];

    const handleLogin = () => {
        router.push("/login");
    };

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            window.location.href = "/login"; // This forces a full refresh
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };


    const handleProfile = () => {
        router.push("/dashboard");
    };

    return (
        <nav>
            {/* Upper strap */}
            <div className="flex justify-between items-center bg-white py-3 px-4 sm:px-6 border-b border-gray-300 shadow-sm select-none">
                {/* Left: Social Icons */}
                <div className="flex space-x-2 sm:space-x-4">
                    <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="text-blue-600"
                        whileHover={iconHover}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
                    </motion.a>
                    <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="text-pink-500"
                        whileHover={iconHover}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src="/instagram.png" alt="Instagram" className="w-8 h-8" />
                    </motion.a>
                </div>

                {/* Center: Website name */}
                <motion.div
                    className="hidden sm:block font-extrabold text-xl sm:text-2xl text-gray-900 select-text cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.1, color: "#079DB6" }}
                    onClick={() => router.push("/")}
                >
                    Work in Germany
                </motion.div>

                {/* Right: Auth buttons - Hidden on mobile */}
                <div className="hidden sm:flex items-center space-x-4">
                    {isLoading ? (
                        <FaSpinner className="animate-spin text-gray-500" />
                    ) : isAuthenticated ? (
                        <>
                            <motion.button
                                onClick={handleProfile}
                                className="bg-[#079DB6] hover:bg-[#057a8a] text-white font-semibold px-6 py-2 rounded-full shadow-md text-sm active:scale-95 transition duration-200 ease-in-out cursor-pointer flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaUser className="text-sm" />
                                <span>{userData?.name || "Dashboard"}</span>
                            </motion.button>

                        </>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="bg-[#079DB6] hover:bg-[#057a8a] text-white font-semibold px-6 py-2 rounded-full shadow-md text-sm active:scale-95 transition duration-200 ease-in-out cursor-pointer"
                        >
                            Login
                        </button>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="sm:hidden text-gray-700 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <FaTimes className="w-6 h-6" />
                    ) : (
                        <FaBars className="w-6 h-6" />
                    )}
                </button>

            </div>

            {/* Lower strap - Hidden on mobile */}
            <div className="hidden sm:block bg-[#079DB6] py-3 sm:py-4 overflow-x-auto">
                <ul className="flex justify-start sm:justify-center space-x-6 sm:space-x-12 px-4 sm:px-0">
                    {navItems.map(({ href, label }) => (
                        <motion.li key={href} className="relative list-none shrink-0">
                            <Link href={href} passHref legacyBehavior>
                                <motion.a
                                    className="text-white font-semibold text-base sm:text-lg cursor-pointer"
                                    whileHover={linkHover}
                                >
                                    {label}
                                    <motion.span
                                        className="absolute left-0 -bottom-1 h-0.5 bg-white"
                                        variants={underlineVariants}
                                        initial="hidden"
                                        whileHover="visible"
                                    />
                                </motion.a>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="sm:hidden bg-white shadow-lg"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuVariants}
                    >
                        <motion.div className="px-4 py-2 border-b border-gray-200">
                            <motion.div
                                className="font-extrabold text-xl text-gray-900 py-2"
                                variants={mobileItemVariants}
                                onClick={() => {
                                    router.push("/");
                                    setIsOpen(false);
                                }}
                            >
                                Work in Germany
                            </motion.div>
                        </motion.div>

                        <motion.ul className="px-4 py-2">
                            {navItems.map(({ href, label }) => (
                                <motion.li
                                    key={href}
                                    variants={mobileItemVariants}
                                    className="border-b border-gray-100 last:border-0"
                                >
                                    <Link href={href} passHref legacyBehavior>
                                        <motion.a
                                            className="block py-3 text-gray-700 font-medium"
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {label}
                                        </motion.a>
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div
                            className="px-4 py-4"
                            variants={mobileItemVariants}
                        >
                            {isLoading ? (
                                <div className="w-full flex justify-center">
                                    <FaSpinner className="animate-spin text-gray-500 text-2xl" />
                                </div>
                            ) : isAuthenticated ? (
                                <>
                                    <div className="flex items-center justify-between mb-4 px-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-gray-200 p-2 rounded-full">
                                                <FaUser className="text-gray-600" />
                                            </div>
                                            <span className="font-medium">{userData?.name || "User"}</span>
                                        </div>
                                        <button
                                            onClick={handleProfile}
                                            className="text-sm text-[#079DB6] font-medium"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        disabled={isLoggingOut}
                                        className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-md active:scale-95 transition duration-200 ease-in-out ${isLoggingOut ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        {isLoggingOut ? <FaSpinner className="animate-spin mx-2" /> : "Logout"}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLogin();
                                        setIsOpen(false);
                                    }}
                                    className="w-full bg-[#079DB6] hover:bg-[#057a8a] text-white font-semibold px-4 py-2 rounded-full shadow-md active:scale-95 transition duration-200 ease-in-out cursor-pointer"
                                >
                                    Login
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}