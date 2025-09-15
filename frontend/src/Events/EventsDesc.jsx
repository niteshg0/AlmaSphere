import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Timer,
    Star,
    X,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    Share2,
    Heart,
    Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { events }  from './eventsData';
import { useParams } from 'react-router-dom';

const EventDetailsPage = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate(); 
    const { eventId } = useParams();

    const event = events.find((e) => e.id === parseInt(eventId));

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % event.gallery.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + event.gallery.length) % event.gallery.length);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'long' }),
            date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        };
    };

    const getStatusColor = (status) => {
        return status === 'upcoming'
            ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300';
    };

    const getTypeColor = (type) => {
        const colors = {
            social: 'bg-gradient-to-r from-pink-500 to-rose-500',
            networking: 'bg-gradient-to-r from-blue-500 to-cyan-500',
            professional: 'bg-gradient-to-r from-purple-500 to-indigo-500',
            reunion: 'bg-gradient-to-r from-orange-500 to-amber-500'
        };
        return colors[type] || 'bg-gradient-to-r from-gray-500 to-slate-500';
    };
      if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-xl p-8 text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Event not found</h2>
                    <Link to="/events" className="text-indigo-600 underline">Back to Events</Link>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation Bar */}
            <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex w-full items-center justify-between h-16">
                        <Link to="/events">
                            <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back to Events
                            </button>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Share2 className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
                
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif leading-tight">
                                {event.title}
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg">
                                <div className="flex items-center">
                                    <Calendar className="h-6 w-6 mr-3 text-blue-300" />
                                    <span>{formatDate(event.date).day}, {formatDate(event.date).date}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-6 w-6 mr-3 text-green-300" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Event Info Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mb-4">
                                        Event Details
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <Calendar className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold">{formatDate(event.date).day}</p>
                                                <p className="text-sm">{formatDate(event.date).date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <Clock className="h-5 w-5 mr-3 text-purple-500 flex-shrink-0" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-start text-gray-600 dark:text-gray-300">
                                            <MapPin className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold">{event.venue}</p>
                                                <p className="text-sm">{event.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start sm:items-end gap-3">
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(event.status)}`}>
                                        {event.status === 'upcoming' ? '🚀 Upcoming Event' : '📚 Ongoing Event'}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {(event.tags ?? []).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-lg"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mb-6">
                                About This Event
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                {(event.description.split('\n\n') ?? []).map((paragraph, index) => (
                                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 last:mb-0">
                                        {paragraph.trim()}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Image Gallery Section */}
                        {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mb-8">
                                Event Gallery
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {event.gallery.map((image, index) => (
                                    <div
                                        key={index}
                                        className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`Event gallery ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="text-white text-center">
                                                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2 mx-auto">
                                                    <span className="text-2xl">🔍</span>
                                                </div>
                                                <p className="text-sm font-semibold">View Image</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col space-y-8 ">
                        {/* Stats Section */}
                        <div className="order-3 lg:order-2 mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif mb-6">
                                Event Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg mr-4">
                                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Attendees</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{event.attendees}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg mr-4">
                                        <Timer className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{event.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-800/50 rounded-lg mr-4">
                                        <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Highlights</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{event.highlights.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="order-2 lg:order-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif mb-6">
                                Event Highlights
                            </h3>
                            <div className="space-y-3">
                                {(event.highlights ?? []).map((highlight, index) => (
                                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                                        <Star className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                                        <span>{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call-to-Action Section */}
                        <div className="order-3 lg:order-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                            <div className="text-center">
                                {event.status === 'upcoming' ? (
                                    <>
                                        <button className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
                                            onClick={() => { navigate('/register', { state: { event } }) }}
                                        >
                                                Register Now
                                            </button>
                                        
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Secure your spot for this exclusive event
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        Registrations are closed for this event.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal
            {lightboxOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={closeLightbox}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <X className="h-8 w-8" />
                        </button>

                        <img
                            src={event.gallery[currentImageIndex]}
                            alt={`Event gallery ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />

                        {event.gallery.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </button>
                            </>
                        )}

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                            {currentImageIndex + 1} of {event.gallery.length}
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default EventDetailsPage;
