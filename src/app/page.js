"use client";

import { Navbar } from "@/app/components/Navbar";
import ServiceCard from "./components/ServiceCard"; // adjust path if needed
import ReviewCard from "./components/ReviewCard";   // import ReviewCard
import { Footer } from "./components/Footer";

export default function Home() {
  const reviews = [
    {
      text: "“This is a great service! Really helped me a lot.”",
      user: "- User 1",
    },
    {
      text: "“Amazing experience, would recommend to everyone.”",
      user: "- User 2",
    },
    {
      text: "“Professional and reliable service.”",
      user: "- User 3",
    },
    {
      text: "“Exceeded my expectations in every way.”",
      user: "- User 4",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Video placeholder */}
      <section className="w-full h-[70vh] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Video will be set here by admin</p>
      </section>

      {/* Services Section */}
      <section className="py-12 px-8 md:px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[960px] mx-auto">
          {[...Array(6)].map((_, idx) => (
            <ServiceCard key={idx} serviceNumber={idx + 1} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-[#079DB6] text-white font-semibold px-4 sm:px-12 py-1 sm:py-2 rounded-full shadow-md text-sm sm:text-base
            hover:bg-[#057a8a] active:scale-95 transition duration-200 ease-in-out cursor-pointer"
          >
            Show More
          </button>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto text-center rounded-lg">
        <h2 className="text-4xl font-bold text-center mb-10">Reviews from Trspivsor</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <ReviewCard
              key={idx}
              index={idx}
              text={review.text}
              user={review.user}
              imgSrc={review.imgSrc}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
