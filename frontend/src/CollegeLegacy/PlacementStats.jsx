import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, CartesianGrid
} from "recharts";
import {
  GraduationCap, BarChart3, TrendingUp, Users, Award, Building2
} from "lucide-react";

// Animated Counter
const AnimatedCounter = ({ value, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
};

export default function CompactPlacementDashboard() {
  const salaryData = [
    { branch: "CSE", avg: 12, highest: 45, median: 10 },
    { branch: "ECE", avg: 9, highest: 32, median: 8 },
    { branch: "ME", avg: 7, highest: 25, median: 6 },
    { branch: "CE", avg: 6, highest: 20, median: 5 },
  ];

  const sectorTrendData = [
    { sector: "IT", q4: 48 },
    { sector: "Core", q4: 28 },
    { sector: "Finance", q4: 18 },
    { sector: "Others", q4: 16 },
  ];

  const yearlyTrend = [
    { year: 2021, placed: 380, total: 400 },
    { year: 2022, placed: 420, total: 450 },
    { year: 2023, placed: 470, total: 500 },
    { year: 2024, placed: 510, total: 550 },
  ];

  const recruiters = ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Tesla"];

  const [selectedBranch, setSelectedBranch] = useState("All");
  const [currentRecruiterIndex, setCurrentRecruiterIndex] = useState(0);

  const placementRate = 93;
  const highestPackage = 45;
  const avgPackage = 8.5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecruiterIndex((prev) => (prev + 1) % recruiters.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen 
      bg-gradient-to-br from-blue-50 via-white to-purple-50 
      dark:from-gray-950 dark:via-black dark:to-gray-950 
      text-gray-800 dark:text-gray-100 transition-colors duration-700">

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="bg-white/20 dark:bg-gray-900/40 
              backdrop-blur-xl border border-blue-500/20 
              rounded-3xl p-8 shadow-lg hover:shadow-blue-500/30 
              transition-all duration-500">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3 
              bg-gradient-to-r from-white to-black 
              bg-clip-text text-transparent drop-shadow-lg">
              <GraduationCap className="w-9 h-9 text-cyan-400 animate-pulse" />
              Placement Analytics
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Comprehensive Real-Time Placement Insights
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-sm">
              <Building2 className="w-4 h-4 text-purple-500" />
              <span className="text-gray-500 dark:text-gray-400">Currently Highlighted Recruiter:</span>
              <span className="text-purple-500 font-semibold">
                {recruiters[currentRecruiterIndex]}
              </span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Placement Rate", value: placementRate, suffix: "%", icon: TrendingUp, glow: "bg-gradient-to-r from-white to-black" },
            { label: "Highest Package", value: highestPackage, suffix: " LPA", icon: Award, glow: "bg-gradient-to-r from-white to-black" },
            { label: "Average Package", value: avgPackage, suffix: " LPA", icon: Users, glow: "bg-gradient-to-r from-white to-black" }
          ].map((stat) => (
            <div key={stat.label} className="relative group">
              <div className={`bg-white/20 dark:bg-gray-900/40 
                border border-${stat.glow}-500/20 rounded-2xl 
                p-6 shadow-lg hover:shadow-${stat.glow}-500/40 
                backdrop-blur-lg transition-all duration-500`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-bold text-${stat.glow}-400 mt-2`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                  </div>
                  <stat.icon className={`w-9 h-9 text-${stat.glow}-400 opacity-80 
                    group-hover:scale-125 transition-transform duration-500`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Branch Filter */}
        <div className="flex justify-center">
          <select
            className="bg-white/30 dark:bg-gray-800/50 
              border border-purple-400/30 rounded-xl px-5 py-2.5 
              text-gray-700 dark:text-gray-200 
              focus:ring-2 focus:ring-purple-500/50 
              hover:bg-white/40 dark:hover:bg-gray-800/70 
              transition-all duration-500"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="All">All Branches</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
          </select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Salary Chart */}
          <div className="bg-white/20 dark:bg-gray-900/40 
              rounded-2xl p-6 border border-blue-400/30 
              backdrop-blur-lg hover:shadow-blue-500/30 transition-all duration-500">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
              <BarChart3 className="w-5 h-5 text-blue-400" /> Salary Packages
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salaryData}>
                <XAxis dataKey="branch" stroke="gray" />
                <YAxis stroke="gray" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30,30,40,0.9)",
                    border: "1px solid #6366f1",
                    borderRadius: "12px",
                    color: "white"
                  }}
                />
                <Bar dataKey="avg" fill="url(#avgGradient)" />
                <Bar dataKey="highest" fill="url(#highestGradient)" />
                <defs>
                  <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="highestGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Growth */}
          <div className="bg-white/20 dark:bg-gray-900/40 
              rounded-2xl p-6 border border-purple-400/30 
              backdrop-blur-lg hover:shadow-purple-500/30 transition-all duration-500">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
              <TrendingUp className="w-5 h-5 text-purple-400" /> Sector Growth
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={sectorTrendData}>
                <XAxis dataKey="sector" stroke="gray" />
                <YAxis stroke="gray" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(40,40,50,0.9)",
                    border: "1px solid #a78bfa",
                    borderRadius: "12px",
                    color: "white"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="q4"
                  stroke="#a78bfa"
                  fill="url(#areaGradient)"
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yearly Trend */}
        <div className="bg-white/20 dark:bg-gray-900/40 
            rounded-2xl p-6 border border-indigo-400/30 
            backdrop-blur-lg hover:shadow-indigo-500/30 transition-all duration-500">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
            <Users className="w-5 h-5 text-indigo-400" /> Yearly Placements
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yearlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="year" stroke="gray" />
              <YAxis stroke="gray" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(25,25,35,0.9)",
                  border: "1px solid #818cf8",
                  borderRadius: "12px",
                  color: "white"
                }}
              />
              <Line dataKey="placed" stroke="#3b82f6" strokeWidth={3} />
              <Line dataKey="total" stroke="#a78bfa" strokeWidth={2} strokeDasharray="6 6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <div className="text-sm flex items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
            <span>Futuristic Placement Dashboard</span>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
}
