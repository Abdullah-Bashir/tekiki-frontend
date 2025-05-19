"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-black text-white text-sm">
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-12 sm:py-24 px-4 sm:px-6">
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
                    <Link href="/" passHref legacyBehavior>
                        <a className="cursor-pointer hover:underline block">Home</a>
                    </Link>
                    <Link href="/services" passHref legacyBehavior>
                        <a className="cursor-pointer hover:underline block">Services</a>
                    </Link>
                    <Link href="/contacts" passHref legacyBehavior>
                        <a className="cursor-pointer hover:underline block">Contact</a>
                    </Link>
                    <Link href="/about-us" passHref legacyBehavior>
                        <a className="cursor-pointer hover:underline block">About Us</a>
                    </Link>
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
                            <img src="/facebook.png" alt="face" />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-pink-500"
                        >
                            <img src="/instagram.png" alt="face" />
                        </a>
                    </div>
                </div>
            </div>

            {/* White strip with centered text */}
            <div className="bg-white py-4 sm:py-5">
                <p className="text-center text-black text-xs">powered by bolum</p>
            </div>
        </footer>
    );
}
