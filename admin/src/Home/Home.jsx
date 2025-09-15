import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data for analytics (replace with actual API calls)
const analyticsData = {
  totalAlumni: 2847,
  activeMembers: 1923,
  pendingApprovals: 34,
  monthlyGrowth: 12.5,
  recentRegistrations: 47,
  upcomingEvents: 8,
  jobPostings: 156,
  donations: 125000,
};

// Chart data
const monthlyRegistrationData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'New Registrations',
      data: [45, 52, 38, 67, 73, 89, 94, 76, 85, 92, 78, 84],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
    },
  ],
};

const engagementData = {
  labels: ['Events', 'Job Portal', 'Donations', 'Networking', 'Alumni Directory'],
  datasets: [
    {
      data: [30, 25, 15, 20, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(139, 92, 246)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 2,
    },
  ],
};

const donationData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Donations ($)',
      data: [25000, 35000, 30000, 35000],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 2,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'rgb(107, 114, 128)',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
        },
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
      },
      ticks: {
        color: 'rgb(107, 114, 128)',
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
      },
      ticks: {
        color: 'rgb(107, 114, 128)',
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        },
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'rgb(107, 114, 128)',
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        },
        padding: 20,
      },
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, -60]);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
      },
    },
    hover: {
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  // Subtle floating elements inspired by Nora AI
  const generateFloatingElements = () => {
    const elements = [];
    for (let i = 0; i < 8; i++) {
      elements.push(
        <motion.div
          key={`float-${i}`}
          className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i * 8)}%`,
          }}
        />
      );
    }
    return elements;
  };

  const AnalyticsCard = ({
    icon,
    title,
    value,
    subtitle,
    trend,
    link,
    index,
  }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative overflow-hidden rounded-2xl h-[240px] bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-blue-100/30 transition-all duration-500" />

      {/* Content container */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Header section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative p-3 bg-blue-50 rounded-xl border border-blue-100 group-hover:bg-blue-100 transition-colors duration-300">
              <div className="text-xl">{icon}</div>
            </div>
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors font-['Inter']">
              {title}
            </h3>
          </div>
          {trend && (
            <div className={`text-xs font-medium px-2 py-1 rounded-full font-['Inter'] ${
              trend > 0 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>

        {/* Value display */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            className="text-3xl font-bold text-gray-900 mb-2 font-['Inter']"
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </motion.div>
          {subtitle && (
            <p className="text-gray-500 text-sm font-medium font-['Inter']">{subtitle}</p>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="mt-4">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>

      {/* Link wrapper */}
      {link && <Link to={link} className="absolute inset-0 z-10 rounded-2xl" />}
    </motion.div>
  );

  const ChartCard = ({ title, children, className = "" }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
    >
      {/* Content */}
      <div className="relative h-full p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 group-hover:text-gray-900 transition-colors font-['Inter']">
          {title}
        </h3>
        <div className="h-full">{children}</div>
      </div>
    </motion.div>
  );

  const QuickActionCard = ({ icon, title, description, link, color }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group relative overflow-hidden rounded-xl h-[180px] bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="relative h-full p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white shadow-sm`}>
            <div className="text-lg">{icon}</div>
          </div>
          <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors font-['Inter']">
            {title}
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 flex-1 font-['Inter']">{description}</p>
        
        <div className="flex justify-end">
          <Link
            to={link}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 transform duration-200 font-['Inter']"
          >
            Go to {title} →
          </Link>
        </div>
      </div>
    </motion.div>
  );

  const InfoCard = ({ title, description, image, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-[#fafafa] md:px-14 py-6 md:py-8 rounded-lg shadow-lg border-4 border-white w-[90%] md:w-auto md:min-w-[22rem]"
    >
      <div>
        <img src={image} alt="" className="block w-[13rem] h-[15rem] object-contain mx-auto" />
      </div>
      <div className="text-center space-y-4 mt-2">
        <p className="font-['Inter'] text-2xl font-semibold text-gray-700">{title}</p>
        <p className="font-['Inter'] text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {generateFloatingElements()}
      </div>

      {/* Background gradients - very subtle */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-30" />
      </motion.div>

      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: y2 }}
      >
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full blur-3xl opacity-30" />
      </motion.div>

      {/* Header Section */}
      <section className="relative text-center py-16 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <h1 className="text-[1.4rem] md:text-[2.9rem] font-semibold text-gray-700 md:px-0 px-7 font-['Inter'] leading-tight">
              Alumni Management Dashboard makes organizing and connecting with your alumni community 
              <span className="block text-blue-600">easy and efficient</span>
            </h1>
            
            {/* Underline accent */}
            <div className="flex justify-center mb-8 mt-7">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto font-['Inter']"
          >
            Transform your alumni engagement through powerful analytics, streamlined event management, and real-time insights.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto py-8 px-4 sm:px-6 relative z-10">
        {/* Analytics Overview */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-gray-900 font-['Inter']"
          >
            Analytics Overview
          </motion.h2>
          <p className="text-gray-600 font-medium font-['Inter']">Key metrics and insights for your alumni community</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <AnalyticsCard
            icon="👥"
            title="Total Alumni"
            value={analyticsData.totalAlumni}
            subtitle="Registered members"
            trend={analyticsData.monthlyGrowth}
            link="/alumni-list"
            index={0}
          />

          <AnalyticsCard
            icon="✅"
            title="Active Members"
            value={analyticsData.activeMembers}
            subtitle="Last 30 days"
            trend={8.2}
            index={1}
          />

          <AnalyticsCard
            icon="⏳"
            title="Pending Approvals"
            value={analyticsData.pendingApprovals}
            subtitle="Awaiting verification"
            link="/pending-approvals"
            index={2}
          />

          <AnalyticsCard
            icon="📈"
            title="New Registrations"
            value={analyticsData.recentRegistrations}
            subtitle="This month"
            trend={15.3}
            index={3}
          />

          <AnalyticsCard
            icon="🎉"
            title="Upcoming Events"
            value={analyticsData.upcomingEvents}
            subtitle="Next 30 days"
            link="/events"
            index={4}
          />

          <AnalyticsCard
            icon="💼"
            title="Job Postings"
            value={analyticsData.jobPostings}
            subtitle="Active listings"
            link="/jobs"
            index={5}
          />

          <AnalyticsCard
            icon="💰"
            title="Total Donations"
            value={`$${(analyticsData.donations / 1000).toFixed(0)}K`}
            subtitle="This year"
            trend={22.1}
            link="/donations"
            index={6}
          />

          <AnalyticsCard
            icon="📊"
            title="Engagement Rate"
            value="84.2%"
            subtitle="Average interaction"
            trend={5.7}
            index={7}
          />
        </motion.div>

        {/* Charts Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-gray-900 font-['Inter']"
          >
            Data Insights
          </motion.h2>
          <p className="text-gray-600 font-medium font-['Inter']">Visual analytics to understand your community better</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
        >
          <ChartCard title="Monthly Registrations" className="h-[400px] lg:col-span-2">
            <div className="h-80">
              <Line data={monthlyRegistrationData} options={chartOptions} />
            </div>
          </ChartCard>

          <ChartCard title="Engagement Distribution" className="h-[400px]">
            <div className="h-80">
              <Doughnut data={engagementData} options={doughnutOptions} />
            </div>
          </ChartCard>

          <ChartCard title="Quarterly Donations" className="h-[350px] lg:col-span-2 xl:col-span-1">
            <div className="h-72">
              <Bar data={donationData} options={chartOptions} />
            </div>
          </ChartCard>

          <ChartCard title="Alumni Growth Trend" className="h-[350px] lg:col-span-2">
            <div className="h-72">
              <Line 
                data={{
                  ...monthlyRegistrationData,
                  datasets: [{
                    ...monthlyRegistrationData.datasets[0],
                    label: "Alumni Growth",
                    data: [2500, 2552, 2590, 2657, 2730, 2819, 2913, 2989, 3074, 3166, 3244, 3328],
                    borderColor: "rgb(16, 185, 129)",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                  }]
                }} 
                options={chartOptions} 
              />
            </div>
          </ChartCard>
        </motion.div>

        {/* Quick Actions */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-gray-900 font-['Inter']"
          >
            Quick Actions
          </motion.h2>
          <p className="text-gray-600 font-medium font-['Inter']">Common administrative tasks and tools</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          <QuickActionCard
            icon="➕"
            title="Add Alumni"
            description="Register new alumni members to the system"
            link="/add-alumni"
            color="from-green-500 to-emerald-600"
          />

          <QuickActionCard
            icon="📝"
            title="Manage Events"
            description="Create and organize alumni events and meetups"
            link="/manage-events"
            color="from-blue-500 to-indigo-600"
          />

          <QuickActionCard
            icon="📧"
            title="Send Notifications"
            description="Broadcast messages to alumni community"
            link="/notifications"
            color="from-purple-500 to-violet-600"
          />

          <QuickActionCard
            icon="📈"
            title="View Reports"
            description="Generate detailed analytics and reports"
            link="/reports"
            color="from-orange-500 to-red-600"
          />

          <QuickActionCard
            icon="⚙️"
            title="System Settings"
            description="Configure platform settings and preferences"
            link="/settings"
            color="from-gray-500 to-slate-600"
          />

          <QuickActionCard
            icon="🔍"
            title="Search Alumni"
            description="Find and filter alumni by various criteria"
            link="/search"
            color="from-teal-500 to-cyan-600"
          />
        </motion.div>

        {/* Information Cards Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-gray-900 font-['Inter']"
          >
            Platform Features
          </motion.h2>
          <p className="text-gray-600 font-medium font-['Inter']">Discover what makes our alumni management system special</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-center mb-16">
          <InfoCard
            title="Got Suggestions?"
            description="Help us improve the platform by sharing your feedback and ideas"
            image="/api/placeholder/208/240"
            delay={0}
          />

          <InfoCard
            title="Want More Info?"
            description="Learn about advanced features and customization options available"
            image="/api/placeholder/192/240"
            delay={0.2}
          />
        </div>

        {/* CTA Section inspired by Nora */}
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 my-16">
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white/90 text-sm font-medium font-['Inter']">Join 1000+ Alumni Networks</span>
            </div>

            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 font-['Inter']">
              Ready to Transform Your Alumni Community?
            </h2>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-['Inter']">
              Move beyond traditional management – build stronger connections with powerful analytics and seamless communication tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-['Inter'] font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3">
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-['Inter'] font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                See Demo
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l7-5-7-5z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0">
            <img src="/api/placeholder/800/400" alt="" className="w-full h-full object-cover opacity-10" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
