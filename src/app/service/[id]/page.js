"use client";

import { useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { MdOutlineFileUpload } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import Calendar from "@/app/components/calendar";

export default function ServiceDetail({ params }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDocsOpen, setIsDocsOpen] = useState(false);
    const [files, setFiles] = useState([]);

    // Sample data - replace with actual data from your database
    const service = {
        id: params.id,
        name: "Service Name",
        description: "Detailed description of the service ".repeat(20),
        images: ["/softwareHouse.jpg", "/softwareHouse.jpg", "/softwareHouse.jpg", "/softwareHouse.jpg"],
        documents: [
            { name: "Document1.pdf", url: "/docs/doc1.pdf" },
            { name: "Document2.pdf", url: "/docs/doc2.pdf" },
        ],
    };

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles(uploadedFiles);
    };

    return (
        <>
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Image Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12">
                    {service.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Service ${index + 1}`}
                            className="w-full h-64 object-cover"
                        />
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Section */}
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold mb-6">{service.name}</h1>
                        <p className="text-gray-600 mb-8">{service.description}</p>

                        <div>
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setIsDocsOpen(!isDocsOpen)}
                            >
                                <h3 className="text-xl font-semibold">Documents</h3>
                                {isDocsOpen ? (
                                    <MdOutlineKeyboardArrowUp size={30} />
                                ) : (
                                    <MdOutlineKeyboardArrowDown size={30} />
                                )}
                            </div>

                            {isDocsOpen && (
                                <div className="mt-4">
                                    {service.documents.map((doc, index) => (
                                        <a
                                            key={index}
                                            href={doc.url}
                                            download
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <span>{doc.name}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 border border-gray-400 rounded-lg p-5">
                        <div className="mb-8">
                            <div className="rounded-lg bg-white">
                                <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
                            </div>
                        </div>


                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
                            <div className="w-full h-1 bg-gray-200 mb-6">
                                <div className="h-full bg-teal-500 w-1/4"></div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <label className="w-1/4">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 bg-gray-200 rounded-md border-gray-200 focus:border-[#079DB6] focus:ring-2 focus:ring-[#079DB6]/30 transition-all outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <label className="w-1/4">Email</label>
                                    <input
                                        type="email"
                                        className=" p-2 w-full bg-gray-200 rounded-md border-gray-200 focus:border-[#079DB6] focus:ring-2 focus:ring-[#079DB6]/30 transition-all outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Upload CV:</label>
                                    <label className="flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#079DB6] transition-colors cursor-pointer bg-gray-50">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                        <div className="text-center p-4">
                                            <MdOutlineFileUpload size={35} className="mx-auto text-2xl mb-2 text-[#079DB6]" />
                                            <p className="text-gray-500">
                                                Drag and drop files here, or click to browse
                                            </p>
                                            {files.length > 0 && (
                                                <p className="text-sm text-green-600 mt-2">
                                                    {files.length} file(s) selected
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center mt-8">
                                    <button
                                        type="submit"
                                        className="bg-[#079DB6] text-white px-10 py-2 rounded-full hover:bg-[#057f91] transition-all shadow-md hover:shadow-lg font-medium"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}