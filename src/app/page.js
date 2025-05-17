"use client";

import Navbar from "@/app/components/Navbar";
import ServiceCard from "./components/ServiceCard"; // Adjust this path if needed
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Footer from "./components/Footer";

const reviewVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  return (
    <>
      <Navbar />


      {/* Video placeholder */}
      <section className="w-full h-[60vh] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Video will be set here by admin</p>
      </section>


      {/* Services Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-10">Services</h2>
        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[960px] mx-auto">
          {[...Array(6)].map((_, idx) => (
            <ServiceCard key={idx} serviceNumber={idx + 1} />
          ))}
        </div>
      </section>


      {/* Reviews Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-cente rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold mb-10">Reviews from Trspivsor</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <motion.blockquote
              key={idx}
              className="bg-white p-6 rounded-md shadow-md italic text-gray-700 flex flex-col justify-between cursor-pointer"
              style={{ minHeight: "180px" }}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={reviewVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(128,128,128,0.3)" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div>
                {/* Star Rating */}
                <div className="flex mb-2 text-yellow-400 justify-center">
                  {[...Array(5)].map((_, starIdx) => (
                    <FaStar key={starIdx} />
                  ))}
                </div>

                <p>“This is a great service! Really helped me a lot.”</p>
              </div>

              <footer className="mt-4 text-right font-semibold">- User {idx + 1}</footer>
            </motion.blockquote>

          ))}
        </div>
      </section>

      <Footer />

    </>
  );
}
