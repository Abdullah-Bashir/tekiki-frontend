// src/app/admin/components/AddServicePopup.js
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { createService, fetchServices } from '@/app/redux/api/serviceSlice';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

// Dynamically import TextEditor with SSR disabled
const TextEditor = dynamic(() => import('./TextEditor'), {
    ssr: false,
    loading: () => <div className="p-3 bg-gray-100 rounded-md">Loading editor...</div>
});

const AddServicePopup = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        serviceName: '',
        description: '',
        coverImage: null,
        interviewDates: [{ date: '', time: '' }],
    });

    const [media, setMedia] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const coverImageInputRef = useRef(null);
    const mediaInputRef = useRef(null);
    const documentsInputRef = useRef(null);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleDescriptionChange = (value) => {
        setFormData(prev => ({ ...prev, description: value }));
    };

    const resetForm = () => {
        setFormData({
            serviceName: '',
            description: '',
            coverImage: null,
            interviewDates: [{ date: '', time: '' }],
        });
        setMedia([]);
        setDocuments([]);

        // Clear file input references
        if (coverImageInputRef.current) coverImageInputRef.current.value = '';
        if (mediaInputRef.current) mediaInputRef.current.value = '';
        if (documentsInputRef.current) documentsInputRef.current.value = '';
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Invalid image type. Please upload a JPEG, PNG, GIF, or WebP image.');
            e.target.value = '';
            return;
        }

        setFormData(prev => ({ ...prev, coverImage: file }));
    };

    const handleInterviewDateChange = (index, field, value) => {
        const updatedDates = [...formData.interviewDates];
        updatedDates[index][field] = value;
        setFormData(prev => ({ ...prev, interviewDates: updatedDates }));
    };

    const addInterviewDate = () => {
        if (formData.interviewDates.length < 7) {
            setFormData(prev => ({
                ...prev,
                interviewDates: [...prev.interviewDates, { date: '', time: '' }]
            }));
        }
    };

    const removeInterviewDate = (index) => {
        if (formData.interviewDates.length > 1) {
            const updatedDates = formData.interviewDates.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, interviewDates: updatedDates }));
        }
    };

    const validateForm = () => {
        if (!formData.serviceName.trim()) {
            toast.error('Service name is required');
            return false;
        }
        if (!formData.description.trim() || formData.description === '<p></p>') {
            toast.error('Description is required');
            return false;
        }
        if (!formData.coverImage) {
            toast.error('Cover image is required');
            return false;
        }
        if (formData.interviewDates.some(item => !item.date || !item.time)) {
            toast.error('All interview dates must have both date and time');
            return false;
        }
        if (media.length < 4 || media.length > 10) {
            toast.error('You must upload between 4 to 10 media files');
            return false;
        }
        return true;
    };

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime', 'video/webm'];
        const invalidFiles = files.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            toast.error(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}`);
            e.target.value = '';
            return;
        }

        const newTotal = media.length + files.length;
        if (newTotal > 10) {
            toast.error(`Maximum 10 media files allowed. You tried to add ${files.length}, but already have ${media.length}.`);
            e.target.value = '';
            return;
        }

        setMedia(prev => [...prev, ...files]);
        e.target.value = '';
    };

    const handleDocumentsChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const invalidFiles = files.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            toast.error(`Invalid document type(s): ${invalidFiles.map(f => f.name).join(', ')}`);
            e.target.value = '';
            return;
        }

        setDocuments(prev => [...prev, ...files]);
        e.target.value = '';
    };

    const removeMedia = (index) => {
        const updatedMedia = media.filter((_, i) => i !== index);
        setMedia(updatedMedia);
    };

    const removeDocument = (index) => {
        const updatedDocs = documents.filter((_, i) => i !== index);
        setDocuments(updatedDocs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('serviceName', formData.serviceName);
            submitData.append('description', formData.description);
            submitData.append('interviewDates', JSON.stringify(formData.interviewDates));
            submitData.append('coverImage', formData.coverImage, formData.coverImage.name);

            media.forEach((file) => {
                submitData.append(`media`, file, file.name);
            });

            documents.forEach((file) => {
                submitData.append(`documents`, file, file.name);
            });

            // Dispatch creation action and wait for it to complete
            await dispatch(createService(submitData)).unwrap();

            // After creation, fetch the updated list of services
            await dispatch(fetchServices()).unwrap();

            toast.success('Service created successfully!');
            resetForm();
            onSuccess();
            onClose();
        } catch (err) {
            toast.error(err.message || 'Failed to create service');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-[#079DB6] border-2 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Add New Service</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Basic Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                                <input
                                    type="text"
                                    name="serviceName"
                                    placeholder="e.g., Premium Consultation"
                                    value={formData.serviceName}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-[#079DB6] focus:ring-2 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <TextEditor
                                    content={formData.description}
                                    onChange={handleDescriptionChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image *</label>
                                <input
                                    type="file"
                                    onChange={handleCoverImageChange}
                                    accept="image/*"
                                    className="hidden"
                                    id="cover-image-upload"
                                    ref={coverImageInputRef}
                                    required
                                />
                                <label htmlFor="cover-image-upload" className="cursor-pointer">
                                    <div className="border-2 border-dashed border-gray-300 hover:border-[#079DB6] rounded-lg p-6 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            {formData.coverImage ? (
                                                <>
                                                    <img
                                                        src={URL.createObjectURL(formData.coverImage)}
                                                        alt="Cover preview"
                                                        className="h-20 w-20 object-cover rounded"
                                                    />
                                                    <span className="text-sm">{formData.coverImage.name}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-blue-600 font-medium">Click to upload cover image</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Interview Dates Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Interview Dates</h2>
                            <p className="text-sm text-gray-500">Add between 1-7 available dates and times for interviews</p>

                            {formData.interviewDates.map((date, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="date"
                                        value={date.date}
                                        onChange={(e) => handleInterviewDateChange(index, 'date', e.target.value)}
                                        className="w-1/2 p-3 border border-gray-300 rounded-md outline-none focus:ring-[#079DB6] focus:ring-2 focus:border-transparent"
                                        required
                                    />
                                    <input
                                        type="time"
                                        value={date.time}
                                        onChange={(e) => handleInterviewDateChange(index, 'time', e.target.value)}
                                        className="w-1/2 p-3 border border-gray-300 rounded-md outline-none focus:ring-[#079DB6] focus:ring-2 focus:border-transparent"
                                        required
                                    />
                                    {formData.interviewDates.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeInterviewDate(index)}
                                            className="p-2 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            {formData.interviewDates.length < 7 && (
                                <button
                                    type="button"
                                    onClick={addInterviewDate}
                                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Another Date
                                </button>
                            )}
                        </div>

                        {/* Media Upload Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Media Upload</h2>
                            <p className="text-sm text-gray-500">Upload 4-10 images/videos (PNG, JPG, MP4)</p>

                            <div className="border-2 border-dashed border-gray-300 hover:border-[#079DB6] rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleMediaChange}
                                    accept="image/*,video/*"
                                    className="hidden"
                                    id="media-upload"
                                    ref={mediaInputRef}
                                />
                                <label htmlFor="media-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-blue-600 font-medium">Click to upload media files</span>
                                        <span className="text-xs text-gray-500">or drag and drop</span>
                                    </div>
                                </label>
                            </div>

                            {media.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                                        Selected Media ({media.length}/10)
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {media.map((file, index) => (
                                            <div key={index} className="border rounded p-2 flex items-center justify-between bg-gray-50">
                                                <span className="text-sm truncate">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeMedia(index)}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Documents Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Documents</h2>
                            <p className="text-sm text-gray-500">Upload supporting documents (PDF, DOC, DOCX)</p>

                            <div className="border-2 border-dashed hover:border-[#079DB6] border-gray-300 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleDocumentsChange}
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    id="documents-upload"
                                    ref={documentsInputRef}
                                />
                                <label htmlFor="documents-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-blue-600 font-medium">Click to upload documents</span>
                                        <span className="text-xs text-gray-500">or drag and drop</span>
                                    </div>
                                </label>
                            </div>

                            {documents.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Documents ({documents.length})</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {documents.map((file, index) => (
                                            <div key={index} className="border rounded p-2 flex items-center justify-between bg-gray-50">
                                                <span className="text-sm truncate">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeDocument(index)}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 bg-[#079DB6] hover:bg-[#074DB7] text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : 'Create Service'}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddServicePopup;