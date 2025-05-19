"use client";

import { useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import ServiceCard from "../components/ServiceCard"; // adjust path if needed
import { Footer } from "../components/Footer";

export default function Services() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <Navbar />

            {/* Video placeholder */}
            <section className="w-full h-[50vh] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-xl">SERVICES ARE HERE</p>
            </section>

            {/* Services Section */}
            <section className="py-12 px-8 md:px-4 max-w-6xl mx-auto">
                {/* Search Bar */}
                <div className="max-w-[960px] mx-auto mb-8 flex justify-start">
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-[45%] min-w-[200px] rounded-full border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#079DB6] focus:border-[#079DB6] transition"
                    />
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[960px] mx-auto">
                    {[...Array(12)].map((_, idx) => (
                        <ServiceCard key={idx} serviceNumber={idx + 1} />
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
