"use client";

import { Navbar } from "@/app/components/Navbar";
import { Footer } from "../components/Footer";

export default function About() {
    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-10 md:px-40 py-12">
                {/* Page header */}
                <div className="text-center">
                    <p className="text-sm mb-2 mt-8">ABOUT US</p>
                    <h1 className="text-3xl md:text-7xl font-semibold text-black">Tour Operator in Tunisia</h1>
                </div>

                {/* Terms & Conditions section */}
                <div className="mb-12 mt-20">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms & Conditions</h2>
                    <div className=" rounded-lg">
                        <p className="text-gray-600 mb-4">
                            Welcome to our tour operator services in Tunisia. By accessing and using our services,
                            you accept and agree to be bound by the terms and provisions of this agreement.
                            Welcome to our tour operator services in Tunisia. By accessing and using our services,
                            you accept and agree to be bound by the terms and provisions of this agreement.
                            Welcome to our tour operator services in Tunisia. By accessing and using our services,
                            you accept and agree to be bound by the terms and provisions of this agreement.
                        </p>
                        <p className="text-gray-600 mb-4">
                            All bookings are subject to availability and confirmation. Prices are subject to change
                            without notice until the booking is confirmed. We reserve the right to modify these terms
                            at any time, so please review them frequently.
                        </p>
                        <p className="text-gray-600">
                            Cancellations must be made at least 14 days prior to the tour date for a full refund.
                            Cancellations made within 7-14 days will receive a 50% refund. No refunds will be given
                            for cancellations made less than 7 days before the tour date.
                        </p>
                    </div>
                </div>

                {/* Use of the Website section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of the Website</h2>
                    <div className="rounded-lg">
                        <p className="text-gray-600 mb-4">
                            Our website is provided for your personal use and information. You may not use our site
                            for any commercial purposes without our express written consent.
                        </p>
                        <p className="text-gray-600 mb-4">
                            The content of the pages of this website is for your general information and use only.
                            It is subject to change without notice. Neither we nor any third parties provide any
                            warranty or guarantee as to the accuracy, timeliness, performance, completeness or
                            suitability of the information and materials found or offered on this website.
                        </p>
                        <p className="text-gray-600">
                            Unauthorized use of this website may give rise to a claim for damages and/or be a
                            criminal offense. From time to time, this website may also include links to other
                            websites. These links are provided for your convenience to provide further information.
                        </p>
                    </div>
                </div>

                {/* Privacy Policy section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
                    <div className="rounded-lg">
                        <p className="text-gray-600 mb-4">
                            We are committed to protecting your privacy. We collect personal information only when
                            you voluntarily provide it to us, such as when you make a booking or inquiry.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Your information will be used to process your bookings, provide you with our services,
                            and for internal record keeping. We may use your email address to send you information
                            about new tours, special offers or other information which we think you may find
                            interesting.
                        </p>
                        <p className="text-gray-600">
                            We will not sell, distribute or lease your personal information to third parties unless
                            we have your permission or are required by law to do so. You may request details of
                            personal information which we hold about you under the Data Protection Act.
                        </p>
                    </div>
                </div>

                {/* Learn More button */}
                <div className="text-center my-8">
                    <button className="bg-[#079DB6] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#057a8a] transition duration-200 ease-in-out">
                        Learn More
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}