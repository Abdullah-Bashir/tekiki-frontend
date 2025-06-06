"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import Calendar from "@/app/components/calendar";
import { fetchServiceById } from "@/app/redux/api/serviceSlice";
import Loader from "@/app/components/Loader";
import { useValidateTokenQuery } from "@/app/redux/api/authApi";

export default function ServiceDetail({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);
    const [showAllMedia, setShowAllMedia] = useState(false);
    const [isDocsOpen, setIsDocsOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cv: null
    });

    const dispatch = useDispatch();
    const { currentService, loading, error } = useSelector((state) => state.service);

    // Validate token and get user data with cache invalidation
    const {
        data: authData,
        isLoading: authLoading,
        isError: authError,
        refetch: refetchAuth
    } = useValidateTokenQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const user = authData?.user;

    useEffect(() => {
        dispatch(fetchServiceById(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (authError) {
            setFormData({
                name: '',
                email: '',
                cv: null
            });
            return;
        }

        if (user) {
            setFormData({
                name: user.username || '',
                email: user.email || '',
                cv: user.documents?.find(doc => doc.type === 'cv') || null
            });
        } else {
            setFormData({
                name: '',
                email: '',
                cv: null
            });
        }
    }, [user, authError]);

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles(uploadedFiles);
        if (uploadedFiles.length > 0) {
            setFormData(prev => ({
                ...prev,
                cv: {
                    originalName: uploadedFiles[0].name,
                    file: uploadedFiles[0]
                }
            }));
        }
    };

    const handleProtectedAction = () => {
        if (!user) {
            router.push('/login');
            return;
        }
    };

    if (loading || authLoading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <Loader />
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!currentService) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <Loader />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Image Gallery */}
                <div className="mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {(showAllMedia ? currentService.media : currentService.media?.slice(0, 4))?.map(
                            (mediaItem, index) => (
                                <img
                                    key={index}
                                    src={mediaItem.url}
                                    alt={`Service media ${index + 1}`}
                                    className="w-full h-80 object-cover"
                                />
                            )
                        )}
                    </div>

                    {currentService.media?.length > 4 && (
                        <button
                            onClick={() => setShowAllMedia(!showAllMedia)}
                            className="text-green-600 text-sm mt-2 italic cursor-pointer hover:underline"
                        >
                            {showAllMedia ? "View less" : "View more"}
                        </button>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Section */}
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold mb-6">{currentService.serviceName}</h1>
                        {/* Render HTML description safely */}
                        <div 
                            className="text-gray-600 mb-7 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: currentService.description }}
                        />

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
                                    {currentService.documents?.map((doc, index) => (
                                        <a
                                            key={doc._id}
                                            href={`${process.env.NEXT_PUBLIC_API_URL}/api/service/${currentService._id}/download/${doc._id}`}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <span>{doc.originalName}</span>
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
                                <Calendar
                                    selectedDate={selectedDate}
                                    onChange={setSelectedDate}
                                    interviewDates={currentService.interviewDates}
                                />
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
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        readOnly={!!user}
                                    />
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <label className="w-1/4">Email</label>
                                    <input
                                        type="email"
                                        className="p-2 w-full bg-gray-200 rounded-md border-gray-200 focus:border-[#079DB6] focus:ring-2 focus:ring-[#079DB6]/30 transition-all outline-none"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        readOnly={!!user}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Upload CV:</label>
                                    <label className="flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#079DB6] transition-colors cursor-pointer bg-gray-50">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <div className="text-center p-4">
                                            <MdOutlineFileUpload size={35} className="mx-auto text-2xl mb-2 text-[#079DB6]" />
                                            {formData.cv ? (
                                                <>
                                                    <p className="text-green-600">Current CV: {formData.cv.originalName}</p>
                                                    <p className="text-sm text-gray-500 mt-2">Click to upload new CV</p>
                                                </>
                                            ) : (
                                                <p className="text-gray-500">
                                                    Drag and drop files here, or click to browse
                                                </p>
                                            )}
                                            {files.length > 0 && (
                                                <p className="text-sm text-green-600 mt-2">
                                                    {files.length} new file(s) selected
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                </div>

                                <div className="flex justify-center mt-8">
                                    <button
                                        type="submit"
                                        className="bg-[#079DB6] text-white px-10 py-2 rounded-full hover:bg-[#057f91] transition-all shadow-md hover:shadow-lg font-medium"
                                        onClick={handleProtectedAction}
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