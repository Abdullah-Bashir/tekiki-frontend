"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import ServiceCard from "../components/ServiceCard";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import Link from "next/link";

import { fetchServices } from "@/app/redux/api/serviceSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Services() {

    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { services, loading, error } = useSelector((state) => state.service);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    // Filter services based on search term
    const filteredServices = services?.filter(service =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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

                {loading ? (
                    <Loader />
                ) : error ? (
                    <motion.div
                        className="text-center text-red-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {error.message || "Failed to load services"}
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[960px] mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            {filteredServices.map((service) => (
                                <motion.div
                                    key={service._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Link href={`/service/${service._id}`} passHref>
                                        <ServiceCard
                                            coverImage={service.coverImage}
                                            serviceName={service.serviceName}
                                            description={service.description}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {filteredServices.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No services found matching your search</p>
                            </div>
                        )}
                    </>
                )}
            </section>

            <Footer />
        </>
    );
}