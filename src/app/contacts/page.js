"use client";

import { useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "../components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Contacts() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Navbar />

            {/* Video placeholder */}
            <section className="w-full h-[50vh] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-xl">GET IN TOUCH WITH US</p>
            </section>

            {/* Contact form section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Left side - Contact form (wider) */}
                    <div className="flex-[1.5] pr-0 md:pr-8 border-r-0 md:border-r border-gray-300 flex flex-col">
                        <h2 className="text-4xl font-bold text-black mb-2">We'd like to contact you</h2>
                        <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

                        <form className="space-y-4 flex-grow">
                            <div className="flex items-center gap-4">
                                <label htmlFor="name" className="w-24 text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#079DB6]"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label htmlFor="email" className="w-24 text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#079DB6]"
                                    placeholder="Your email"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label htmlFor="phone" className="w-24 text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-200  focus:outline-none focus:ring-2 focus:ring-[#079DB6]"
                                    placeholder="Your phone number"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label htmlFor="message" className="w-24 text-gray-700">Message</label>
                                <input
                                    type="text"
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-200  focus:outline-none focus:ring-2 focus:ring-[#079DB6]"
                                    placeholder="Your message"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-[#079DB6] text-white font-semibold px-6 py-2  hover:bg-[#057a8a] transition duration-200 rounded-full "
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>


                    {/* Right side - Contact info (narrower) */}
                    <div className="flex-1 pl-0 md:pl-8">

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <FaPhone className="text-[#079DB6] mt-1 mr-4" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Phone</h3>
                                    <p className="text-gray-600">+216 12 345 678</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FaEnvelope className="text-[#079DB6] mt-1 mr-4" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Email</h3>
                                    <p className="text-gray-600">contact@tekiki.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-[#079DB6] mt-1 mr-4" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-800">Location</h3>
                                    <p className="text-gray-600">Ave, Mohammed V, Tunisia</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#079DB6] hover:text-[#057a8a]">
                                    <img src="/facebook.png" alt="face" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#079DB6] hover:text-[#057a8a]">
                                    <img src="/instagram.png" alt="face" />
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}
