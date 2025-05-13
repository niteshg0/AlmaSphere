import React from "react";

const team = [
  {
    name: "Aarav Sharma",
    role: "President",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Patel",
    role: "Vice President",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Verma",
    role: "Events Lead",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },

];

const impactStats = [
  { label: "Alumni Worldwide", value: "12,000+" },
  { label: "Events Hosted", value: "150+" },
  { label: "Scholarships Awarded", value: "300+" },
  { label: "Countries Represented", value: "35" },
];

const coreValues = [
  { icon: "🤝", title: "Community", desc: "We foster a strong, supportive network for all alumni." },
  { icon: "🌱", title: "Growth", desc: "We encourage lifelong learning and personal development." },
  { icon: "💡", title: "Innovation", desc: "We embrace new ideas and creative solutions." },
  { icon: "🌟", title: "Integrity", desc: "We act with honesty, transparency, and respect." },
];

const AboutUs = () => (
  <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-200">
    {/* Hero Section - Split Layout */}
    {/* <h3 className="text-2xl font-bold text-center text-indigo-900 dark:text-indigo-400 mb-10 font-sans">About us</h3> */}
    <section className="relative max-w-6xl mx-auto py-16 sm:py-20 md:py-30 px-4 sm:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-0 overflow-hidden">
      {/* Decorative blobs */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left-side subtle color difference: soft blue/indigo blob */}
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl bg-blue-200 dark:bg-indigo-800 opacity-20" />
      </div>
      {/* Left: Text Content in Glass Card */}
      <div className="relative z-10 md:w-1/2 flex justify-center md:justify-start">
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/60 rounded-3xl shadow-2xl p-8 md:p-12 max-w-xl w-full">
          <span className="block text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-widest mb-3 text-sm md:text-base">Who We Are</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif mb-4 bg-clip-text text-transparent leading-tight bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-400 dark:to-purple-400">
            Empowering Alumni, Inspiring Futures
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-serif mb-6 text-gray-700 dark:text-gray-300 font-light leading-relaxed">
            We are a vibrant community of graduates, dedicated to fostering lifelong connections, supporting each other's growth, and giving back to our alma mater. Our mission is to empower alumni, celebrate achievements, and create opportunities for the next generation.
          </p>
          <blockquote className="italic text-indigo-700 dark:text-indigo-300 border-l-4 border-indigo-400 pl-4 mb-6">
            "Together, we create a legacy of excellence and support that lasts a lifetime."
          </blockquote>
          <a
            href="#team"
            className="inline-block px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
          >
            Meet the Team
          </a>
        </div>
      </div>
      {/* Right: Illustration */}
      <div className="relative z-10 md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="/undraw_teamwork_8val.svg"
          alt="Alumni Teamwork Illustration"
          className="w-96 max-w-full drop-shadow-xl"
        />
      </div>
    </section>

    {/* Mission & Vision Section */}
    <section className="max-w-5xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-8">
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center">
        <svg className="w-14 h-14 mb-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"></path>
          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636"></path>
        </svg>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300">
          To connect, inspire, and empower alumni through meaningful events, mentorship, and opportunities for collaboration and growth.
        </p>
      </div>
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center">
        <svg className="w-14 h-14 mb-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 4v16m8-8H4"></path>
        </svg>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Our Vision</h2>
        <p className="text-gray-700 dark:text-gray-300">
          To build a global network of alumni who uplift each other and make a positive impact on society and the world.
        </p>
      </div>
    </section>

    {/* Core Values Section */}
    <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 dark:text-indigo-400 mb-10 font-sans tracking-tight">Our Core Values</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {coreValues.map((val) => (
          <div
            key={val.title}
            className="group bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-3xl text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
              {val.icon}
            </div>
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-2 tracking-tight">{val.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center text-sm font-medium">{val.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Alumni Impact Section */}
    <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 dark:text-indigo-400 mb-10 font-sans tracking-tight">Alumni Impact</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {impactStats.map((fact) => (
          <div
            key={fact.label}
            className="bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse mb-2">{fact.value}</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold text-center text-base">{fact.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Meet Our Team Section */}
    <section id="team" className="max-w-6xl mx-auto py-16 px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-900 dark:text-indigo-400 mb-12 font-sans tracking-tight">
        Meet Our Team
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, idx) => (
          <div
            key={member.name}
            className="relative bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-800/90 dark:via-gray-800/90 dark:to-gray-900/90 rounded-3xl shadow-xl p-8 flex flex-col items-center transition-transform duration-300 hover:-translate-y-4 hover:shadow-2xl w-64 z-10"
            style={{ marginLeft: idx !== 0 ? -40 : 0 }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 rounded-full border-4 border-blue-400 dark:border-blue-600 mb-4 object-cover shadow-lg"
            />
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-1 tracking-tight">{member.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default AboutUs;
