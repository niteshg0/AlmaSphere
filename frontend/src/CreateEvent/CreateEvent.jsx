import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Image, Users, FileText, AlertCircle, Loader2, User, GraduationCap, Sparkles, Award, Star, UserCheck } from 'lucide-react';

const AlumniEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    type: '',
    organizer: '',
    deadline: '',
    banner: null,
    maxAttendees: '',
    isFeatured: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, banner: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setBannerPreview(e.target.result);
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.banner) {
        setErrors(prev => ({ ...prev, banner: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Event description is required';
    if (!formData.date) newErrors.date = 'Event date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.type) newErrors.type = 'Event type is required';
    if (!formData.organizer) newErrors.organizer = 'Event organizer is required';
    if (!formData.deadline) newErrors.deadline = 'Registration deadline is required';
    if (!formData.maxAttendees) newErrors.maxAttendees = 'Maximum attendees limit is required';
    if (formData.maxAttendees && (parseInt(formData.maxAttendees) < 1 || parseInt(formData.maxAttendees) > 10000)) {
      newErrors.maxAttendees = 'Maximum attendees must be between 1 and 10,000';
    }
    
    // Validate time range
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    
    // Validate deadline is before event date
    if (formData.deadline && formData.date && new Date(formData.deadline) >= new Date(formData.date)) {
      newErrors.deadline = 'Registration deadline must be before event date';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Event created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        type: '',
        organizer: '',
        deadline: '',
        banner: null,
        maxAttendees: '',
        isFeatured: false
      });
      setBannerPreview(null);
      setErrors({});
    } catch (error) {
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All data will be lost.')) {
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        type: '',
        organizer: '',
        deadline: '',
        banner: null,
        maxAttendees: '',
        isFeatured: false
      });
      setBannerPreview(null);
      setErrors({});
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-cyan-600/90"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Create Alumni Event
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <p className="text-blue-100">Connect, celebrate, and create memories together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Event Organizer Selection */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-800 mb-4">
                Event Organized By *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.organizer === 'alumni' 
                      ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'organizer', value: 'alumni' } })}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${formData.organizer === 'alumni' ? 'bg-blue-500' : 'bg-gray-100'}`}>
                      <User className={`w-6 h-6 ${formData.organizer === 'alumni' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Alumni</h3>
                      <p className="text-sm text-gray-600">Event organized by alumni community</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="organizer"
                    value="alumni"
                    checked={formData.organizer === 'alumni'}
                    onChange={handleInputChange}
                    className="absolute top-4 right-4"
                  />
                </div>

                <div 
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.organizer === 'college' 
                      ? 'border-purple-500 bg-purple-50 shadow-lg transform scale-105' 
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'organizer', value: 'college' } })}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${formData.organizer === 'college' ? 'bg-purple-500' : 'bg-gray-100'}`}>
                      <GraduationCap className={`w-6 h-6 ${formData.organizer === 'college' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">College</h3>
                      <p className="text-sm text-gray-600">Official college event</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="organizer"
                    value="college"
                    checked={formData.organizer === 'college'}
                    onChange={handleInputChange}
                    className="absolute top-4 right-4"
                  />
                </div>
              </div>
              {errors.organizer && (
                <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.organizer}
                </p>
              )}
            </div>

            {/* Event Title */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Event Title *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                    errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter a compelling event title"
                />
              </div>
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Event Description */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 resize-none ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Provide detailed information about your event, including agenda, speakers, and what attendees can expect..."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Date and Time Range */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Event Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                      errors.date ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Start Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                      errors.startTime ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.startTime && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  End Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                      errors.endTime ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.endTime && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>

            {/* Time Range Preview */}
            {formData.startTime && formData.endTime && formData.startTime < formData.endTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Event Duration: </span>
                  <span>{formatTime(formData.startTime)} - {formatTime(formData.endTime)}</span>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                    errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="Enter venue address or online meeting link"
                />
              </div>
              {errors.location && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* Event Type and Registration Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Event Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                    errors.type ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <option value="">Select event format</option>
                  <option value="in-person">🏢 In-Person Event</option>
                  <option value="online">💻 Virtual Event</option>
                  <option value="hybrid">🌐 Hybrid Event</option>
                </select>
                {errors.type && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.type}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-3.5">
                  Registration Deadline *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-3.5 text-gray-400 z-10" />
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                      errors.deadline ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.deadline && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.deadline}
                  </p>
                )}
              </div>
            </div>

            {/* Maximum Attendees and Featured Event */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Maximum Attendees Limit *
                </label>
                <div className="relative">
                  <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <input
                    type="number"
                    name="maxAttendees"
                    value={formData.maxAttendees}
                    onChange={handleInputChange}
                    min="1"
                    max="10000"
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 ${
                      errors.maxAttendees ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter maximum number of attendees"
                  />
                </div>
                {errors.maxAttendees && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.maxAttendees}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Set the maximum number of people who can register (1-10,000)
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Featured Event
                </label>
                <div className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.isFeatured 
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg transform scale-105' 
                    : 'border-gray-200 bg-white hover:border-yellow-300 hover:shadow-md'
                }`}
                onClick={() => handleInputChange({ target: { name: 'isFeatured', value: !formData.isFeatured } })}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${formData.isFeatured ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gray-100'}`}>
                        <Star className={`w-6 h-6 ${formData.isFeatured ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Make this a featured event</h3>
                        <p className="text-sm text-gray-600">Highlight this event for better visibility</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => handleInputChange({ target: { name: 'isFeatured', value: e.target.checked } })}
                        className="w-5 h-5 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                    </div>
                  </div>
                  {formData.isFeatured && (
                    <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 text-yellow-800">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">This event will be prominently displayed and get priority placement!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Banner Image */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Upload Event Banner (Optional)
              </label>
              <div className="relative">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <Image className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-700">Upload Event Banner</p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {bannerPreview && (
                <div className="mt-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Award className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="order-2 md:order-1 px-8 py-4 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:shadow-md"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="order-1 md:order-2 md:ml-auto px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 transform"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Amazing Event...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Create Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniEventForm;