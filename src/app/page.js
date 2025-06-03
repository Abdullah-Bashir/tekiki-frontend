"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "@/app/components/Navbar";
import ServiceCard from "./components/ServiceCard";
import ReviewCard from "./components/ReviewCard";
import { Footer } from "./components/Footer";
import Link from "next/link";
import { fetchServices } from "@/app/redux/api/serviceSlice";
import { motion } from "framer-motion";
import Loader from "./components/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const reviews = [
    { text: "“This is a great service! Really helped me a lot.”", user: "- User 1" },
    { text: "“Amazing experience, would recommend to everyone.”", user: "- User 2" },
    { text: "“Professional and reliable service.”", user: "- User 3" },
    { text: "“Exceeded my expectations in every way.”", user: "- User 4" },
  ];

  const top3Services = services?.slice(0, 3) || [];

  return (
    <>
      <Navbar />

      {/* Video Placeholder */}
      <section className="w-full h-[70vh] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Video will be set here by admin</p>
      </section>

      {/* Services Section */}
      <section className="py-12 px-8 md:px-4 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Services
        </motion.h2>

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
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[960px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {top3Services.map((service) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link href={`/service/${service._id}`} passHref>
                  <ServiceCard
                    coverImage={service.coverImage}
                    serviceName={service.serviceName}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center mt-8">
          <Link href="/services" passHref>
            <motion.button
              className="bg-[#079DB6] text-white font-semibold px-4 sm:px-12 py-1 sm:py-2 rounded-full shadow-md text-sm sm:text-base hover:bg-[#057a8a] active:scale-95 transition duration-200 ease-in-out cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show More
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center rounded-lg">
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Reviews from Trspivsor
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <ReviewCard index={idx} text={review.text} user={review.user} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  );
}