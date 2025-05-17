"use client";

import { motion } from "framer-motion";

const dummyImage = "https://www.cabidigitallibrary.org/cms/asset/9ed8ccb5-7c9a-4fdc-816b-8b807d1fe2ab/9781789241488.cover.jpg";

export default function ServiceCard({ serviceNumber }) {
    return (
        <motion.div
            className="overflow-hidden flex flex-col bg-white cursor-pointer"
            style={{ height: 420 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(128, 128, 128, 0.3)" }}
            transition={{ type: "tween", duration: 0.3 }}
        >
            {/* Image - 70% height */}
            <img
                src={dummyImage}
                alt={`Service ${serviceNumber}`}
                className="w-full object-cover"
                style={{ height: "75%" }}
            />

            {/* Heading - 10% height */}
            <h3 className="text-xl font-bold px-2 py-2" style={{ height: "10%" }}>
                Service {serviceNumber}
            </h3>

            {/* Button - 20% height, aligned left with padding */}
            <div className="flex items-center px-2" style={{ height: "25%" }}>
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
