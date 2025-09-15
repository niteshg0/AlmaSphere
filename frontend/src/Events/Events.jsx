import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, Download, Filter, X, Search, Users, Sparkles, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { events } from './eventsData';

const AlumniEventsSection = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Manual events data


    // Dashboard stats
    const upcomingCount = events.filter(e => e.status === 'upcoming').length;
    const registeredCount = events.reduce((acc, e) => acc + (e.registered || 0), 0);
    const totalCount = events.length;

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
        { value: 'on-going', label: 'On Going' }
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

    // const handleExport = () => {
    //     const dataStr = JSON.stringify(filteredEvents, null, 2);
    //     const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    //     const exportFileDefaultName = 'alumni_events.json';

    //     const linkElement = document.createElement('a');
    //     linkElement.setAttribute('href', dataUri);
    //     linkElement.setAttribute('download', exportFileDefaultName);
    //     linkElement.click();
    // };

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
        <section className="pt-10 pd-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-10 flex flex-col justify-center align-center items-center">
                {/* Header Section */}
                <div className=" w-full z-5 text-white  mb-8 bg-gradient-to-r from-blue-700 to-purple-600 p-6 rounded-lg shadow-lg lg:h-64">
                    {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
                        <Calendar className="h-8 w-8 text-white" />
                    </div> */}
                    <h1 className="text-white lg:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
                        Alumni Events
                    </h1>
                    <p className="text-lg text-white text-gray-600 max-w-5xl leading-relaxed">
                        Discover amazing opportunities to connect, learn, and grow with your alumni community.
                        Join us for unforgettable experiences that strengthen our lifelong bonds.
                    </p>
                </div>

                {/* Dashboard Section */}
                <div className="w-[60%]  lg:-mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 z-8 bg-white rounded-2xl shadow-lg p-2 mx-10 lg:p-4">
                    <div className="bg-gray-100 rounded-2xl p-2 flex flex-col ">
                        <div className='flex flex-row justify-between items-center w-full'>

                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 mb-4">
                                <Calendar className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-indigo-700 mb-2">{upcomingCount}</div>
                        </div>
                        <div className="text-xl text-bold font-semibold text-gray-700 mb-1">Upcoming Events</div>
                        <div className="text-sm text-gray-500">Don't miss out!</div>
                    </div>

                    <div className="bg-gray-100 rounded-2xl  p-2 flex flex-col">
                        <div className='flex flex-row justify-between items-center w-full align-center'>
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mb-4">
                                <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-pink-700 mb-2">{registeredCount}</div>
                        </div>
                        <div className="text-xl font-semibold text-gray-700 mb-1">Registered</div>
                        <div className="text-sm text-gray-500">Total registrations</div>
                    </div>

                    <div className="bg-gray-100 rounded-2xl  p-2 flex flex-col ">
                        <div className='flex flex-row justify-between items-center w-full align-center'>
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 mb-4">
                                <Users className="h-4 w-4 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-emerald-700 mb-2">{totalCount}</div>
                        </div>
                        <div className="text-xl font-semibold text-gray-700 mb-1">Total Events</div>
                        <div className="text-sm text-gray-500">Upcoming & On Going</div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="w-[100%] mx-auto p-6 mb-4 bg-white rounded-2xl shadow-lg ">
                    <div className="flex flex-col lg:flex-row justify-between items-center align-items-center gap-6">
                        {/* Filter Tabs */}
                        <div className="flex justify-start ">
                            <div className="inline-flex bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                {eventStatuses.map((status) => (
                                    <button
                                        key={status.value}
                                        onClick={() => setStatusFilter(status.value)}
                                        className={`px-4 py-2 m-1 font-semibold  transition-all duration-200 rounded-lg  ${statusFilter === status.value
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                                            : 'bg-white text-gray-700 hover:bg-blue-50'
                                            }`}
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <Link to="/create-event">
                                <button
                                    onClick={handleCreateEvent}
                                    className="group flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <Plus className="h-5 w-5 mr-3 transition-transform group-hover:rotate-90" />
                                    Create Event
                                </button>
                            </Link>


                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-12 pr-4 py-3 w-64 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Events Grid */}
                <div className="flex flex-col gap-8">
                    {filteredEvents.map((event) => (
                        <Link to={`/events/${event.id}`} key={event.id} className="w-full">
                            <div
                                key={event.id}
                                className={`group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 flex flex-row h-[320px] mx-auto w-full max-w-7xl ${event.featured ? 'ring-2 ring-gradient-to-r from-blue-400 to-purple-400' : ''
                                    }`}
                                style={{ minHeight: '200px', margin: '0 auto' }}
                            >
                                {/* Featured Badge */}
                                {event.featured && (
                                    <div className="absolute top-4 left-4 z-10 flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        Featured
                                    </div>
                                )}
                                {/* Event Image */}
                                <div className="relative w-2/5 h-full overflow-hidden flex-shrink-0">
                                    {event.image ? (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            style={{ height: '100%', minHeight: '200px', maxHeight: '320px' }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <Calendar className="h-20 w-20 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="w-3/5 p-8 flex flex-col flex-grow justify-between">
                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                        {event.title}
                                    </h3>
                                    {/* Date & Time */}
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                            <span className="text-sm font-medium">{formatDate(event.date)}</span>
                                        </div>
                                        <div className="flex items-center ml-6">
                                            <Clock className="h-4 w-4 mr-2 text-purple-500" />
                                            <span className="text-sm font-medium">{event.time}</span>
                                        </div>
                                    </div>
                                    {/* Location & Attendees */}
                                    <div className="flex items-center text-gray-600 mb-2">
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
                                    <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
                                        {event.description}
                                    </p>
                                    {/* Badges */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getTypeColor(event.type)}`}>
                                                <span className="mr-1">{getTypeIcon(event.type)}</span>
                                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                            </span>
                                        </div>
                                        <span
                                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${event.status === 'upcoming'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {event.status === 'upcoming' ? '🚀 Upcoming' : '📚 On Going'}
                                        </span>
                                    </div>
                                    {/* Action Button */}
                                    {/* <div className="mt-auto flex justify-end">
                                    <button
                                        className={`px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform`}
                                        onClick={() => {
                                            if (event.status === 'upcoming') {
                                                navigate('/register', { state: { event } });
                                            } else {
                                                navigate(`/events/${event.id}`);
                                            }
                                        }}
                                    >
                                        {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
                                    </button>
                                </div> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


                {/* No Results Message */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-8">
                            <Filter className="h-12 w-12 text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            No events match your criteria
                        </h3>
                        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
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

                {/* View All Link */}
                {filteredEvents.length > 0 && (
                    <div className="text-center mt-16">
                        <button className="group inline-flex items-center px-8 py-4 text-blue-600 font-bold hover:text-blue-700 transition-all duration-300 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/80 border border-blue-200">
                            Explore All Events
                            <svg className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section >
    );
};

export default AlumniEventsSection;