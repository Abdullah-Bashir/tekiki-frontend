"use client";

import { motion } from "framer-motion";

export default function ServiceCard({ coverImage, serviceName }) {
    return (
        <motion.div
            className="overflow-hidden flex flex-col bg-white cursor-pointer"
            style={{ height: 440 }} // slightly increased overall card height
            whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(128, 128, 128, 0.3)" }}
            transition={{ type: "tween", duration: 0.3 }}
        >
            {/* Image container with more height */}
            <div className="relative w-full" style={{ height: "78%", overflow: "hidden" }}>
                <img
                    src={coverImage || "https://www.cabidigitallibrary.org/cms/asset/9ed8ccb5-7c9a-4fdc-816b-8b807d1fe2ab/9781789241488.cover.jpg"}
                    alt={serviceName}
                    className="absolute w-full h-full object-cover"
                    style={{ objectPosition: "top" }} // focus on top
                />
            </div>

            {/* Heading */}
            <h3 className="text-2xl font-bold px-2 py-2" style={{ height: "10%" }}>
                {serviceName}
            </h3>

            {/* Button */}
            <div className="flex items-center px-2" style={{ height: "15%" }}>
                <button
                    className="bg-[#079DB6] text-white font-semibold py-2 px-6 rounded-full
          hover:bg-[#057a8a] transition-colors"
                >
                    Book this Service
                </button>
            </div>
        </motion.div>
    );
}
