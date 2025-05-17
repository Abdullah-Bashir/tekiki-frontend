"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

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

export default function Navbar() {
    return (
        <nav>
            {/* Upper strap */}
            <div className="flex justify-between items-center bg-white py-3 px-6 border-b border-gray-300 shadow-sm select-none">
                {/* Left: Social Icons */}
                <div className="flex space-x-6">
                    <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="text-blue-600"
                        whileHover={iconHover}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaFacebookF size={22} />
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
                        <FaInstagram size={22} />
                    </motion.a>
                </div>

                {/* Center: Website name */}
                <motion.div
                    className="font-extrabold text-2xl text-gray-900  select-text cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.1, color: "#079DB6" }}
                >
                    Tekiki
                </motion.div>

                {/* Right: Login button WITHOUT framer-motion */}
                <button
                    className="bg-[#079DB6] text-white font-semibold px-12 py-2 rounded-full shadow-md
                    hover:bg-[#057a8a] active:scale-95 transition duration-200 ease-in-out cursor-pointer"
                >
                    Login
                </button>
            </div>

            {/* Lower strap */}
            <div className="bg-[#079DB6] py-4">
                <ul className="flex justify-center space-x-12">
                    {[
                        { href: "/", label: "Home" },
                        { href: "/services", label: "Services" },
                        { href: "/contacts", label: "Contacts" },
                        { href: "/about-us", label: "About Us" },
                    ].map(({ href, label }) => (
                        <motion.li key={href} className="relative list-none">
                            <Link href={href} passHref legacyBehavior>
                                <motion.a
                                    className="text-white font-semibold text-lg cursor-pointer "
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
        </nav>
    );
}
