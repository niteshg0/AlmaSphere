import React, { useState, useMemo, useEffect } from "react";
import {
    Search, Star, StarOff, ChevronDown, ChevronUp,
    Users, Calendar, Award, ExternalLink, Mail, Phone,
    Code, Cpu, Zap, Radio, Palette, BookOpen, Plane,
    Bot, Trophy, Heart, MapPin, Moon, Sun
} from "lucide-react";

// Sample Society Data
const societiesData = [
    // Branch-wise Societies
    {
        id: 1,
        name: "CES",
        fullName: "Computer Science & Engineering Society",
        category: "Branch-wise",
        branch: "Computer Science",
        icon: Code,
        description: "Fostering innovation in software development, AI, and emerging technologies through hands-on projects and industry collaboration.",
        highlights: ["Annual Hackathon", "Tech Talks", "Open Source Contributions", "Industry Partnerships"],
        mentor: "Dr. Sarah Johnson",
        coordinator: "Alex Chen",
        email: "ces@college.edu",
        achievements: "Winner of 3 National Hackathons, 50+ Open Source Projects",
        members: 180,
        established: 2015,
        events: ["CodeFest 2024", "AI Workshop Series", "Industry Mentorship Program"],
        isFavorite: false
    },
    {
        id: 2,
        name: "CSSE",
        fullName: "Information Technology Society",
        category: "Branch-wise",
        branch: "Information Technology",
        icon: Cpu,
        description: "Bridging the gap between theoretical IT concepts and real-world applications through practical workshops and industry exposure.",
        highlights: ["Cloud Computing Labs", "Cybersecurity Workshops", "Database Challenges", "IT Certification Programs"],
        mentor: "Prof. Michael Zhang",
        coordinator: "Priya Sharma",
        email: "csse@college.edu",
        achievements: "70+ IT Certifications, 5 Industry Partnerships",
        members: 145,
        established: 2016,
        events: ["Cloud Summit 2024", "Cyber Security Bootcamp", "Database Olympics"],
        isFavorite: false
    },
    {
        id: 3,
        name: "EEL",
        fullName: "Electrical Engineering Society",
        category: "Branch-wise",
        branch: "Electrical Engineering",
        icon: Zap,
        description: "Powering the future through innovative electrical systems, renewable energy projects, and smart grid technologies.",
        highlights: ["Power Systems Lab", "Renewable Energy Projects", "Smart Grid Research", "Industry Visits"],
        mentor: "Dr. Robert Wilson",
        coordinator: "Arjun Patel",
        email: "eel@college.edu",
        achievements: "15 Patents Filed, 3 Research Papers Published",
        members: 120,
        established: 2014,
        events: ["Power Tech Expo", "Renewable Energy Summit", "Circuit Design Challenge"],
        isFavorite: false
    },
    {
        id: 4,
        name: "ECES",
        fullName: "Electronics & Communication Engineering Society",
        category: "Branch-wise",
        branch: "Electronics & Communication",
        icon: Radio,
        description: "Advancing communication technologies through innovative projects in IoT, embedded systems, and wireless communication.",
        highlights: ["IoT Innovation Lab", "Embedded Systems Projects", "Wireless Communication Research", "Tech Symposiums"],
        mentor: "Dr. Lisa Anderson",
        coordinator: "Rahul Kumar",
        email: "eces@college.edu",
        achievements: "20+ IoT Projects, 2 Startup Incubations",
        members: 160,
        established: 2013,
        events: ["IoT Hackathon", "Communication Systems Workshop", "Embedded Tech Fair"],
        isFavorite: false
    },
    // Independent Societies
    {
        id: 5,
        name: "Cultural Synod",
        fullName: "Cultural Synod",
        category: "Independent",
        branch: "Cultural",
        icon: Palette,
        description: "Celebrating diversity and creativity through artistic expressions, cultural festivals, and community engagement programs.",
        highlights: ["Annual Cultural Fest", "Art Exhibitions", "Music Concerts", "Dance Competitions"],
        mentor: "Prof. Emma Davis",
        coordinator: "Kavya Reddy",
        email: "cultural@college.edu",
        achievements: "50+ Cultural Events, 200+ Artists Showcased",
        members: 220,
        established: 2010,
        events: ["Spring Cultural Fest", "Art Gallery Exhibition", "Music Night"],
        isFavorite: false
    },
    {
        id: 6,
        name: "Editorial Board",
        fullName: "Editorial Board",
        category: "Independent",
        branch: "Media & Communication",
        icon: BookOpen,
        description: "Documenting college life and achievements through publications, newsletters, and digital media platforms.",
        highlights: ["Monthly Newsletter", "Annual Magazine", "Digital Content", "Photography"],
        mentor: "Dr. James Miller",
        coordinator: "Sneha Gupta",
        email: "editorial@college.edu",
        achievements: "100+ Articles Published, 50K+ Social Media Reach",
        members: 85,
        established: 2012,
        events: ["Journalism Workshop", "Photography Contest", "Writing Competition"],
        isFavorite: false
    },
    {
        id: 7,
        name: "Drone & IoT Club",
        fullName: "Drone & IoT Innovation Club",
        category: "Independent",
        branch: "Technology",
        icon: Plane,
        description: "Exploring the skies and connecting devices through cutting-edge drone technology and IoT solutions.",
        highlights: ["Drone Racing", "IoT Projects", "Aerial Photography", "Smart City Solutions"],
        mentor: "Dr. Kevin Brown",
        coordinator: "Aditya Singh",
        email: "drone-iot@college.edu",
        achievements: "10 Drone Prototypes, 25+ IoT Solutions",
        members: 95,
        established: 2018,
        events: ["Drone Racing Championship", "IoT Innovation Fair", "Smart City Hackathon"],
        isFavorite: false
    },
    {
        id: 8,
        name: "IEEE-STB",
        fullName: "IEEE Student Technical Branch",
        category: "Independent",
        branch: "Technical",
        icon: Trophy,
        description: "Connecting students with global IEEE network for technical excellence, professional development, and innovation.",
        highlights: ["IEEE Conferences", "Technical Papers", "Professional Networking", "Industry Standards"],
        mentor: "Prof. Daniel Lee",
        coordinator: "Rohit Jain",
        email: "ieee@college.edu",
        achievements: "30+ IEEE Papers, Global Recognition Award",
        members: 110,
        established: 2011,
        events: ["IEEE TechCon", "Standards Workshop", "Professional Development Seminar"],
        isFavorite: false
    },
    {
        id: 9,
        name: "Robotics Club",
        fullName: "Robotics & Automation Club",
        category: "Independent",
        branch: "Technology",
        icon: Bot,
        description: "Building the future through autonomous systems, AI-powered robots, and innovative automation solutions.",
        highlights: ["Robot Competitions", "AI Integration", "Automation Projects", "Industry Collaboration"],
        mentor: "Dr. Rachel Green",
        coordinator: "Vikash Kumar",
        email: "robotics@college.edu",
        achievements: "5 National Robot Competitions Won, 15 Prototypes",
        members: 130,
        established: 2017,
        events: ["Robo Wars", "AI Robotics Summit", "Automation Challenge"],
        isFavorite: false
    }
];



const SocietyCard = ({ society, isExpanded, onToggle, onFavorite }) => {
    const IconComponent = society.icon;

    return (
        <div className="group relative">
            {/* Neon glow */}
            <div className="absolute inset-0 dark:from-white dark:to-black rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 dark:opacity-60" />

            <div className="relative backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transform hover:-translate-y-1 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                                {society.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                {society.fullName}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onFavorite(society.id)}
                            className={`p-2 rounded-lg transition-all duration-200 ${society.isFavorite
                                ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-600/30 dark:text-yellow-400"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-300"
                                }`}
                        >
                            {society.isFavorite ? (
                                <Star className="w-4 h-4 fill-current" />
                            ) : (
                                <StarOff className="w-4 h-4" />
                            )}
                        </button>
                        <span
                            className={`text-center px-3 py-1 rounded-full text-xs font-medium ${society.category === "Branch-wise"
                                ? "bg-blue-100 text-blue-800 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-600 dark:text-white"
                                : "bg-white-100 text-purple-800 dark:text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-600"
                                }`}
                        >
                            {society.branch}
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{society.members} Members</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 dark:from-white  dark:to-black" />
                        <span>Est. {society.established}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {society.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1">
                        <Award className="w-4 h-4 text-teal-500 " /> Key Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {society.highlights
                            .slice(0, isExpanded ? society.highlights.length : 3)
                            .map((highlight, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gradient-to-r from-teal-100 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-600 text-teal-800 dark:text-white text-xs rounded-full border border-teal-200 dark:border-white"
                                >
                                    {highlight}
                                </span>
                            ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>
                            <strong>Mentor:</strong> {society.mentor}
                        </p>
                        <p>
                            <strong>Coordinator:</strong> {society.coordinator}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <a
                            href={`mailto:${society.email}`}
                            className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-600/30 transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                        <button className="p-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Expanded */}
                {isExpanded && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4 animate-fadeIn">
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Recent Events
                            </h4>
                            <div className="space-y-2">
                                {society.events.map((event, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                                        {event}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Achievements
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {society.achievements}
                            </p>
                        </div>
                    </div>
                )}

                {/* Expand/Collapse */}
                <button
                    onClick={onToggle}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium"
                >
                    See More 
                </button>

            </div>
        </div>
    );
};
const SocietyModal = ({ society, onClose }) => {
    if (!society) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative animate-fadeIn">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    ✕
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {society.fullName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {society.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {society.highlights.map((h, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                            >
                                {h}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Events */}
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Recent Events
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                        {society.events.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ul>
                </div>

                {/* Achievements */}
                <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Achievements
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        {society.achievements}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default function CollegeSocietiesPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All Societies");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [societies, setSocieties] = useState(societiesData);
    const [selectedSociety, setSelectedSociety] = useState(null);

    // 👇 Add filter options
    const filterOptions = ["All Societies", "Branch-wise Societies", "Independent Societies"];

    // Sync dark mode with <html>
    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [darkMode]);

    const filteredSocieties = useMemo(() => {
        let filtered = societies;

        if (activeFilter !== "All Societies") {
            const category = activeFilter.replace(" Societies", "");
            filtered = filtered.filter((s) => s.category === category);
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (s) =>
                    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.branch.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "branch") return a.branch.localeCompare(b.branch);
            if (sortBy === "members") return b.members - a.members;
            if (sortBy === "established") return b.established - a.established;
            return 0;
        });

        return filtered;
    }, [societies, activeFilter, searchTerm, sortBy]);

    const toggleFavorite = (id) => {
        setSocieties((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
            )
        );
    };

    return (
        <div className="min-h-screen dark:bg-gradient-to-br dark:from-black bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 transition-colors duration-500">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                        <h1 className="text-5xl pb-3 font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 dark:from-white  dark:to-black bg-clip-text text-transparent">
                            College Societies & Clubs
                        </h1>
                        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mt-3">
                            Empowering students through skill development, networking, and
                            innovation. Join our vibrant ecosystem of excellence and
                            collaboration.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2">
                        {filterOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setActiveFilter(option)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeFilter === option
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-600 text-white shadow-lg"
                                    : "bg-white/80 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700 hover:shadow-md border border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search societies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-700 dark:text-gray-200"
                            />
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="branch">Sort by Branch</option>
                            <option value="members">Sort by Members</option>
                            <option value="established">Sort by Year</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSocieties.map((society) => (
                        <SocietyCard
                            key={society.id}
                            society={society}
                            onToggle={() => setSelectedSociety(society)}
                            isExpanded={false} // 👈 no expandedCards anymore
                            onFavorite={toggleFavorite}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredSocieties.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white/80 dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
                            <Users className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                No societies found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Try adjusting your search or filter
                            </p>
                        </div>
                    </div>
                )}
                <SocietyModal
                    society={selectedSociety}
                    onClose={() => setSelectedSociety(null)}
                />
            </div>


            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}