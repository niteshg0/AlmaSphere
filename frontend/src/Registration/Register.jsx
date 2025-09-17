import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // ✅ added useNavigate

const EventRegistrationPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // ✅ initialize navigate
    const event = location.state?.event;

    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        graduationYear: '',
        role: '',
        studentId: '',
        currentProgram: '',
        alumniCompany: '',
        alumniPosition: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // fetch user profile
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.fullName || '',
                email: user.email || '',
                studentId: user.rollNumber || '',
                role: user.role || '',
                graduationYear: user.batch || ''
            }));
        }
    }, [user]);

    // const [formData, setFormData] = useState({
    //     fullName: '',
    //     email: '',
    //     contactNumber: '',
    //     graduationYear: '',
    //     role: '',
    //     studentId: '',
    //     currentProgram: '',
    //     alumniCompany: '',
    //     alumniPosition: ''
    // });

    // const [errors, setErrors] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from({ length: 50 }, (_, i) => currentYear + 4 - i);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
        if (!formData.role) newErrors.role = 'Role is required';
        if (formData.role === 'Alumni' && !formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        if (formData.role === 'Student' && !formData.studentId.trim()) newErrors.studentId = 'College Roll No. is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        const phoneRegex = /^\d{10,15}$/;
        if (formData.contactNumber && !phoneRegex.test(formData.contactNumber.replace(/\D/g, ''))) {
            newErrors.contactNumber = 'Contact number should be 10-15 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setFormData(prev => ({
            ...prev,
            role: newRole,
            studentId: '',
            graduationYear: ''
        }));
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.role;
            delete newErrors.studentId;
            delete newErrors.graduationYear;
            return newErrors;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1200)); // simulate API
        setIsSubmitted(true);
        setIsSubmitting(false);

        // ✅ Redirect to home after 2 seconds
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-4">No event selected</h2>
                    <p className="text-gray-600 dark:text-gray-400">Please go back and select an event to register.</p>
                </div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:bg-gradient-to-br dark:from-black dark:via-gray-700 dark:to-black flex items-center justify-center p-4">
                <div className="max-w-xl w-full bg-white dark:bg-gradient-to-br dark:from-black dark:via-gray-700 dark:to-black rounded-3xl shadow-2xl p-10 text-center border border-indigo-100">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-extrabold text-indigo-900 dark:text-white mb-2">
                            Registration Successful!
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            You have successfully registered for <span className="font-semibold text-indigo-600">{event.title}</span>.
                        </p>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Redirecting to home page...
                        </p>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:bg-gradient-to-br dark:from-black dark:via-gray-700 dark:to-black py-8 px-4 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-indigo-100 dark:border-gray-700 flex flex-col md:flex-row overflow-hidden">
                {/* Left: Event Info */}
                <div className="md:w-1/2 bg-gradient-to-br from-indigo-700 to-blue-600 dark:bg-gradient-to-br dark:from-black dark:via-gray-700 dark:to-black p-10 flex flex-col justify-center text-white animate-slide-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{event.title}</h1>
                    <div className="mb-4">
                        <span className="inline-block bg-white bg-opacity-20 rounded px-3 py-1 text-sm font-semibold mr-2">
                            {event.date} &bull; {event.time}
                        </span>
                        <span className="inline-block bg-white bg-opacity-20 rounded px-3 py-1 text-sm font-semibold">
                            {event.location}
                        </span>
                    </div>
                    <p className="text-indigo-100 dark:text-gray-300 text-lg mb-6">{event.description.split('\n')[0]}</p>
                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2">
                            {event.tags && event.tags.map((tag, idx) => (
                                <span key={idx} className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs font-semibold">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Registration Form */}
                <div className="md:w-1/2 p-10 flex items-center justify-center dark:bg-gradient-to-tr dark:from-black dark:via-gray-700 dark:to-black animate-slide-right">
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 fade-in" style={{ animationDelay: '0.1s' }}>
                            Register for this Event
                        </h2>

                        {/* Full Name */}
                        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={user?.fullName || formData.fullName}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                    dark:bg-gray-800 dark:text-gray-100 ${errors.fullName ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-gray-300 dark:border-gray-700'}`}
                                placeholder="Enter your full name"
                                autoComplete="name"
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div className="fade-in" style={{ animationDelay: '0.3s' }}>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={user?.email || formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                    dark:bg-gray-800 dark:text-gray-100 ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-gray-300 dark:border-gray-700'}`}
                                placeholder="Enter your email address"
                                autoComplete="email"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Contact Number */}
                        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Contact Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={user?.contactNumber || formData.contactNumber}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                    dark:bg-gray-800 dark:text-gray-100 ${errors.contactNumber ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-gray-300 dark:border-gray-700'}`}
                                placeholder="Enter your contact number"
                                autoComplete="tel"
                            />
                            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
                        </div>

                        {/* Role */}
                        <div className="fade-in" style={{ animationDelay: '0.5s' }}>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="role"
                                value={user?.role || formData.role}
                                onChange={handleRoleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                    dark:bg-gray-800 dark:text-gray-100 ${errors.role ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-gray-300 dark:border-gray-700'}`}
                            >
                                <option value="">Select your role</option>
                                <option value="Student">Student</option>
                                <option value="Alumni">Alumni</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                        </div>

                        {/* Student ID */}
                        <div className="fade-in" style={{ animationDelay: '0.6s' }}>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                College Roll No. <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="studentId"
                                value={user?.studentId || formData.studentId}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                    dark:bg-gray-800 dark:text-gray-100 ${errors.studentId ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-gray-300 dark:border-gray-700'}`}
                                placeholder="Enter college roll number"
                            />
                            {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
                        </div>

                        {/* Submit */}
                        <div className="pt-2 fade-in" style={{ animationDelay: '0.7s' }}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 px-6 rounded-xl dark:bg-gradient-to-r dark:from-black dark:via-gray-700 dark:to-black font-semibold text-white transition duration-300 transform 
                                    ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Processing Registration...</span>
                                    </div>
                                ) : (
                                    'Complete Registration'
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2 fade-in" style={{ animationDelay: '0.8s' }}>
                            <span className="text-red-500">*</span> Required fields. All information will be kept confidential.
                        </p>
                    </form>
                </div>
            </div>

            {/* Animation styles */}
            <style>{`
                .animate-slide-left {
                    animation: slideLeft 0.7s cubic-bezier(.4,0,.2,1) both;
                }
                .animate-slide-right {
                    animation: slideRight 0.7s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes slideLeft {
                    from { opacity: 0; transform: translateX(-60px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideRight {
                    from { opacity: 0; transform: translateX(60px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 0.7s forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default EventRegistrationPage;
