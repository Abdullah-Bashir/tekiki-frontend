"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
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
        { href: "/contacts", label: "Contacts" },
        { href: "/about-us", label: "About Us" },
    ];

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <nav>

            {/* Upper strap */}
            <div className="flex justify-between items-center bg-white py-3 px-4 sm:px-6 border-b border-gray-300 shadow-sm select-none">
                {/* Left: Social Icons */}
                <div className="flex space-x-4 sm:space-x-6">
                    <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="text-blue-600"
                        whileHover={iconHover}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
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
                        <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
                    </motion.a>
                </div>

                {/* Center: Website name - Hidden on mobile */}
                <motion.div
                    className="hidden sm:block font-extrabold text-xl sm:text-2xl text-gray-900 select-text cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.1, color: "#079DB6" }}
                >
                    Tekiki
                </motion.div>

                {/* Right: Login button - Hidden on mobile */}
                <button
                    onClick={handleLogin}
                    className="hidden sm:block bg-[#079DB6] text-white font-semibold px-4 sm:px-12 py-1 sm:py-2 rounded-full shadow-md text-sm sm:text-base
                    hover:bg-[#057a8a] active:scale-95 transition duration-200 ease-in-out cursor-pointer"
                >
                    Login
                </button>

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
                            >
                                Tekiki
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
                            <button
                                onClick={() => {
                                    handleLogin();
                                    setIsOpen(false);
                                }}
                                className="w-full bg-[#079DB6] text-white font-semibold px-4 py-2 rounded-full shadow-md
                                hover:bg-[#057a8a] active:scale-95 transition duration-200 ease-in-out cursor-pointer"
                            >
                                Login
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}