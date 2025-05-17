"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black text-white text-sm">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 py-24 px-6">
                {/* Contact Info */}
                <div className="text-left space-y-2">
                    <h3 className="font-semibold text-base mb-3">CONTACT INFO</h3>
                    <p>3287489</p>
                    <p>tekikishabi@gamil.com</p>
                    <p>ave, mohammed, V</p>
                </div>

                {/* Useful Links */}
                <div className="text-left space-y-2">
                    <h3 className="font-semibold text-base mb-3">USEFUL LINKS</h3>
                    <p className="cursor-pointer hover:underline">Home</p>
                    <p className="cursor-pointer hover:underline">Services</p>
                    <p className="cursor-pointer hover:underline">Contact</p>
                    <p className="cursor-pointer hover:underline">About Us</p>
                </div>

                {/* Follow Us */}
                <div className="text-left space-y-4">
                    <h3 className="font-semibold text-base mb-3">FOLLOW US:</h3>
                    <div className="flex space-x-6 text-xl">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-blue-600"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-pink-500"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* White strip with centered text */}
            <div className="bg-white py-5">
                <p className="text-center text-black text-xs">powered by bolum</p>
            </div>
        </footer>
    );
}
