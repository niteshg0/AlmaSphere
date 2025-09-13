import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, Download, Filter, X, Search, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

const AlumniEventsSection = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const events = [
        {
            id: 1,
            title: "Annual Alumni Gala",
            date: "December 15, 2025",
            time: "7:00 PM",
            location: "Grand Ballroom, Hyatt Hotel",
            description: "Join us for an elegant evening celebrating our alumni achievements with dinner, awards, and networking opportunities.",
            type: "social",
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop&crop=center",
            attendees: 250,
            featured: true
        },
        {
            id: 2,
            title: "Tech Industry Networking Summit",
            date: "October 28, 2025",
            time: "6:30 PM",
            location: "Innovation Center",
            description: "Connect with fellow alumni working in technology. Features panel discussions, career opportunities, and startup showcases.",
            type: "networking",
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop&crop=center",
            attendees: 180,
            featured: false
        },
        {
            id: 3,
            title: "Alumni Mentorship Program Launch",
            date: "November 12, 2025",
            time: "5:00 PM",
            location: "Campus Alumni Center",
            description: "Launch of our new mentorship program connecting recent graduates with experienced professionals across industries.",
            type: "professional",
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop&crop=center",
            attendees: 120,
            featured: false
        },
        {
            id: 4,
            title: "Homecoming Weekend Celebration",
            date: "September 20, 2025",
            time: "10:00 AM",
            location: "Main Campus",
            description: "A weekend full of activities including campus tours, class reunions, and the homecoming game with special alumni activities.",
            type: "reunion",
            status: "past",
            image: "https://unsplash.com/photos/a-blue-and-white-calendar-with-red-squares-VPwAFRQTBZM?w=400&h=250&fit=crop&crop=center",
            attendees: 500,
            featured: true
        },
        {
            id: 5,
            title: "Career Fair & Industry Expo",
            date: "August 15, 2025",
            time: "2:00 PM",
            location: "Student Union Building",
            description: "Alumni-hosted career fair featuring opportunities across various industries and experience levels with top employers.",
            type: "professional",
            status: "past",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center",
            attendees: 300,
            featured: false
        },
        {
            id: 6,
            title: "Summer Social Mixer",
            date: "July 10, 2025",
            time: "7:00 PM",
            location: "Rooftop Terrace Venue",
            description: "Casual summer gathering with drinks, appetizers, and great company under the stars with live music.",
            type: "social",
            status: "past",
            image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop&crop=center",
            attendees: 150,
            featured: false
        }
    ];

    const eventTypes = [
        { value: 'all', label: 'All Types' },
        { value: 'social', label: 'Social Events' },
        { value: 'networking', label: 'Networking' },
        { value: 'professional', label: 'Professional' },
        { value: 'reunion', label: 'Reunions' }
    ];

    const eventStatuses = [
        { value: 'all', label: 'All Events' },
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'past', label: 'Past Events' }
    ];

    const filteredEvents = events.filter(event => {
        const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
        const matchesType = typeFilter === 'all' || event.type === typeFilter;
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesType && matchesSearch;
    });

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleCreateEvent = () => {
        alert('Create Event functionality would open a modal or navigate to event creation page');
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(filteredEvents, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'alumni_events.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const clearFilters = () => {
        setStatusFilter('all');
        setTypeFilter('all');
        setSearchTerm('');
    };

    const getTypeColor = (type) => {
        const colors = {
            social: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
            networking: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
            professional: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
            reunion: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
        };
        return colors[type] || 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    };

    const getTypeIcon = (type) => {
        const icons = {
            social: '🎉',
            networking: '🤝',
            professional: '💼',
            reunion: '🎓'
        };
        return icons[type] || '📅';
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
                        <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-6 leading-tight">
                        Alumni Events
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Discover amazing opportunities to connect, learn, and grow with your alumni community.
                        Join us for unforgettable experiences that strengthen our lifelong bonds.
                    </p>
                </div>

                {/* Enhanced Action Bar */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 mb-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <button
                                onClick={handleCreateEvent}
                                className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <Plus className="h-5 w-5 mr-3 transition-transform group-hover:rotate-90" />
                                Create Event
                            </button>

                            <button
                                onClick={handleExport}
                                className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <Download className="h-5 w-5 mr-3 transition-transform group-hover:-translate-y-1" />
                                Export Events
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-4 py-3 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                />
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center justify-center px-6 py-3 font-medium rounded-xl transition-all duration-300 ${showFilters
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                <Filter className="h-5 w-5 mr-2" />
                                Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Filter Bar */}
                {showFilters && (
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-8 mb-10">
                        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between">
                            <div className="flex flex-col sm:flex-row gap-6 flex-1">
                                <div className="min-w-0 flex-1">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Event Type
                                    </label>
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all duration-300"
                                    >
                                        {eventTypes.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Status
                                    </label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all duration-300"
                                    >
                                        {eventStatuses.map(status => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-semibold transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Clear All
                                </button>
                                <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-3 rounded-xl">
                                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                        {filteredEvents.length} events found
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced Events Grid */}
                <div className="flex flex-col gap-8">
                    {filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full ${event.featured ? 'ring-2 ring-gradient-to-r from-blue-400 to-purple-400' : ''
                                }`}
                        >
                            {/* Featured Badge */}
                            {event.featured && (
                                <div className="absolute  top-4 left-4 z-10 flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Featured
                                </div>
                            )}

                            <div className='lg:flex lg:flex-row lg:h-full'>
                                {/* Enhanced Event Image */}

                                <div className="relative lg:h-100 lg:w-100 overflow-hidden flex-shrink-0">
                                    {
                                        event.image ? (
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                        ) : (
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <Calendar className="h-100 w-100 text-gray-400" />
                                            </div>
                                        )
                                    }
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    {/* Event Title */}
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight">
                                        {event.title}
                                    </h3>

                                    {/* Date & Time Row */}
                                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                            <span className="text-sm font-medium">{formatDate(event.date)}</span>
                                        </div>
                                        <div className="flex items-center ml-6">
                                            <Clock className="h-4 w-4 mr-2 text-purple-500" />
                                            <span className="text-sm font-medium">{event.time}</span>
                                        </div>
                                    </div>

                                    {/* Location & Attendees Row */}
                                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                                        <div className="flex items-center flex-1">
                                            <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                                            <span className="text-sm font-medium truncate">{event.location}</span>
                                        </div>
                                        <div className="flex items-center ml-4">
                                            <Users className="h-4 w-4 mr-2 text-orange-500" />
                                            <span className="text-sm font-medium">{event.attendees}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                                        {event.description}
                                    </p>

                                    {/* Enhanced Badges */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex gap-2">
                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getTypeColor(event.type)}`}>
                                                <span className="mr-1">{getTypeIcon(event.type)}</span>
                                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                            </span>
                                        </div>

                                        <span
                                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${event.status === 'upcoming'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300'
                                                }`}
                                        >
                                            {event.status === 'upcoming' ? '🚀 Upcoming' : '📚 Past Event'}
                                        </span>
                                    </div>

                                    {/* Enhanced Action Button */}
                                    <Link to={`/events/${event.id}`}>
                                        <button
                                            className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl mt-auto ${event.status === 'upcoming'
                                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:ring-blue-500'
                                                : 'bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 focus:ring-gray-500'
                                                }`}
                                        >
                                            {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced No Results Message */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-8">
                            <Filter className="h-12 w-12 text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            No events match your criteria
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Try adjusting your search terms or filters to discover more amazing events.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Enhanced View All Link */}
                {filteredEvents.length > 0 && (
                    <div className="text-center mt-16">
                        <button className="group inline-flex items-center px-8 py-4 text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 border border-blue-200 dark:border-blue-800">
                            Explore All Events
                            <svg className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AlumniEventsSection;