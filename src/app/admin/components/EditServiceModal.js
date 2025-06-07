import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('./TextEditor'), {
  ssr: false,
  loading: () => <div className="p-3 bg-gray-100 rounded-md">Loading editor...</div>
});

const EditServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    serviceName: service.serviceName,
    description: service.description,
    coverImage: null,
    interviewDates: service.interviewDates.map(date => ({
      date: new Date(date.date).toISOString().split('T')[0],
      time: date.time
    })),
  });

  const [media, setMedia] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState([]);
  const [docsToDelete, setDocsToDelete] = useState([]);

  const fileInputs = {
    coverImage: useRef(null),
    media: useRef(null),
    documents: useRef(null)
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  const handleFileChange = (type, e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validTypes = {
      coverImage: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      media: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime', 'video/webm'],
      documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    };

    const invalidFiles = files.filter(file => !validTypes[type].includes(file.type));
    if (invalidFiles.length) {
      toast.error(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}`);
      e.target.value = '';
      return;
    }

    if (type === 'coverImage') {
      setFormData(prev => ({ ...prev, coverImage: files[0] }));
    } else if (type === 'media') {
      const newTotal = service.media.length - mediaToDelete.length + media.length + files.length;
      if (newTotal > 10) {
        toast.error(`Maximum 10 media files allowed. You tried to add ${files.length}, but would have ${newTotal}.`);
        return;
      }
      setMedia(prev => [...prev, ...files]);
    } else {
      setDocuments(prev => [...prev, ...files]);
    }
    e.target.value = '';
  };

  const handleInterviewDate = (index, field, value) => {
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

  const removeItem = (type, index, isExisting) => {
    if (type === 'interviewDate') {
      if (formData.interviewDates.length > 1) {
        setFormData(prev => ({
          ...prev,
          interviewDates: prev.interviewDates.filter((_, i) => i !== index)
        }));
      }
    } else if (type === 'media') {
      if (isExisting) {
        setMediaToDelete(prev => [...prev, service.media[index]._id]);
      } else {
        setMedia(prev => prev.filter((_, i) => i !== index));
      }
    } else if (type === 'document') {
      if (isExisting) {
        setDocsToDelete(prev => [...prev, service.documents[index]._id]);
      } else {
        setDocuments(prev => prev.filter((_, i) => i !== index));
      }
    }
  };

  const validateForm = () => {
    const { serviceName, description, interviewDates } = formData;
    const totalMedia = service.media.length - mediaToDelete.length + media.length;

    if (!serviceName.trim()) return toast.error('Service name is required');
    if (!description.trim()) return toast.error('Description is required');
    if (interviewDates.some(item => !item.date || !item.time)) return toast.error('All interview dates must have both date and time');
    if (totalMedia < 4 || totalMedia > 10) return toast.error('You must have between 4 to 10 media files');
    return true;
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

      if (formData.coverImage) submitData.append('coverImage', formData.coverImage);
      media.forEach(file => submitData.append('media', file));
      documents.forEach(file => submitData.append('documents', file));
      if (mediaToDelete.length) submitData.append('mediaToDelete', JSON.stringify(mediaToDelete));
      if (docsToDelete.length) submitData.append('docsToDelete', JSON.stringify(docsToDelete));

      await onSave(submitData);
      toast.success('Service updated successfully!');
      onClose();
    } catch (err) {
      toast.error(err?.message || 'Failed to update service');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFilePreview = (type, files, isExisting = false) => {
    if (!files.length) return null;

    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Selected {type.charAt(0).toUpperCase() + type.slice(1)} ({files.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {files.map((file, index) => (
            <div key={index} className="border rounded p-2 flex items-center justify-between bg-gray-50">
              <span className="text-sm truncate">{file.name || file.url.split('/').pop()}</span>
              <button
                type="button"
                onClick={() => removeItem(type, index, isExisting)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border-[#079DB6] border-2 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Service</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-[#079DB6] focus:ring-2 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <div onKeyDown={(e) => e.key === 'Enter' && e.stopPropagation()}>
                  <TextEditor content={formData.description} onChange={handleDescriptionChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange('coverImage', e)}
                  accept="image/*"
                  className="hidden"
                  id="cover-image-upload-edit"
                  ref={fileInputs.coverImage}
                />
                <label htmlFor="cover-image-upload-edit" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#079DB6] rounded-lg p-6 text-center">
                    {formData.coverImage ? (
                      <img src={URL.createObjectURL(formData.coverImage)} alt="Cover preview" className="h-20 w-20 object-cover rounded mx-auto" />
                    ) : service.coverImage ? (
                      <img src={service.coverImage} alt="Current cover" className="h-20 w-20 object-cover rounded mx-auto" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-blue-600 font-medium">Click to change cover image</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Interview Dates */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Interview Dates</h2>
              {formData.interviewDates.map((date, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={date.date}
                    onChange={(e) => handleInterviewDate(index, 'date', e.target.value)}
                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="time"
                    value={date.time}
                    onChange={(e) => handleInterviewDate(index, 'time', e.target.value)}
                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                    required
                  />
                  {formData.interviewDates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('interviewDate', index)}
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
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Date
                </button>
              )}
            </div>

            {/* Media Files */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Media Files</h2>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange('media', e)}
                accept="image/*,video/*"
                className="hidden"
                id="media-upload-edit"
                ref={fileInputs.media}
              />
              <label htmlFor="media-upload-edit" className="cursor-pointer block border-2 border-dashed border-gray-300 hover:border-[#079DB6] rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-blue-600 font-medium">Click to upload media files</span>
                </div>
              </label>
              {renderFilePreview('media', service.media.filter((_, i) => !mediaToDelete.includes(service.media[i]._id)), true)}
              {renderFilePreview('media', media)}
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Documents</h2>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange('documents', e)}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="documents-upload-edit"
                ref={fileInputs.documents}
              />
              <label htmlFor="documents-upload-edit" className="cursor-pointer block border-2 border-dashed border-gray-300 hover:border-[#079DB6] rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-blue-600 font-medium">Click to upload documents</span>
                </div>
              </label>
              {renderFilePreview('document', service.documents.filter((_, i) => !docsToDelete.includes(service.documents[i]._id)), true)}
              {renderFilePreview('document', documents)}
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-[#079DB6] text-white rounded-md hover:bg-[#074DB7] ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;