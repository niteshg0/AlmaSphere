import { BarChart3, FlaskConical, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";


export default function CollegeLegacy() {
    const navigate  = useNavigate();
const handleContact = ()=>{
    navigate("/contact")
}
    const alumniLocations = [
  { name: "John Doe", coordinates: [-74.006, 40.7128], country: "USA" },
  { name: "Priya Singh", coordinates: [77.209, 28.6139], country: "India" },
  { name: "Alice Smith", coordinates: [2.3522, 48.8566], country: "France" },
  { name: "Carlos Diaz", coordinates: [-58.3816, -34.6037], country: "Argentina" },
];
  const legacyCards = [
     { 
    id: 1, 
    title: "Placement Excellence", 
    icon: <BarChart3 className="w-6 h-6" />, 
    desc: "Decades of strong placements across top firms.", 
    stats: "₹45L+ Highest Package",
    route: "/Stats"
  },
    { id: 2, title: "Research & Innovation", icon: <FlaskConical className="w-6 h-6" />, desc: "Breakthrough patents, labs & startups.", stats: "200+ Patents Filed" ,     route: "/Research"},
    { id: 3, title: "Societies", icon: <GraduationCap className="w-6 h-6" />, desc: "College Societies & Clubs", stats: "15+ Socities" , route:"/societies" }
  ];

  const recruiters = [
    "Google", "Microsoft", "Amazon", "Goldman Sachs", "Deloitte", "Infosys", "Accenture", "TCS"
  ];

  const alumniProfiles = [
    { name: "Riya Sharma", role: "CEO @ StartupX", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Arjun Patel", role: "VP @ Microsoft", img: "https://randomuser.me/api/portraits/men/76.jpg" },
    { name: "Sophia Lee", role: "Scientist @ NASA", img: "https://randomuser.me/api/portraits/women/45.jpg" },
    { name: "David Kim", role: "Founder @ TechLabs", img: "https://randomuser.me/api/portraits/men/64.jpg" },
    { name: "Emma Johnson", role: "Professor @ MIT", img: "https://randomuser.me/api/portraits/women/12.jpg" },
    { name: "Rahul Singh", role: "Engineer @ Google", img: "https://randomuser.me/api/portraits/men/34.jpg" },

  ];
  const scrollData = [...alumniProfiles, ...alumniProfiles];

   const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % alumniProfiles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [alumniProfiles.length]);

 
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-black transition-colors duration-500">
      
      {/* Hero */}
      <section className="relative text-center py-28 px-6 bg-[url('https://source.unsplash.com/1600x600/?university,campus')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-serif font-extrabold text-white">College Legacy</h1>
          <p className="mt-6 text-lg text-neutral-200">
            Honoring decades of excellence in education, research, and global alumni impact.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 -mt-12 relative z-20 mb-24">
        {[
          { value: "25K+", label: "Alumni Worldwide" },
          { value: "98.5%", label: "Placement Rate" },
          { value: "200+", label: "Patents & Innovations" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-10 shadow-lg text-center">
            <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">{stat.value}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Legacy Highlights */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold font-serif text-neutral-900 dark:text-neutral-100 text-center mb-16">
          Legacy Highlights
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {legacyCards.map((card) => (
            <div key={card.id}
             onClick={() => {
                console.log("Card clicked:", card.title);
                navigate(card.route);
              }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{card.title}</h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">{card.desc}</p>
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{card.stats}</span>
            </div>
          ))}
        </div>
     
      </section>
   {/* Alumni World Map */}
        <section className="bg-neutral-100 dark:bg-neutral-950 py-24 px-6 text-center">
      <h2 className="text-3xl font-bold font-serif mb-6 text-neutral-900 dark:text-neutral-100">
        Global Alumni Network
      </h2>
      <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 mb-12">
        Our alumni are shaping industries and communities across the world.
      </p>
 {/* Map Container */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md p-4 max-w-6xl mx-auto h-96">
        <ComposableMap
          projectionConfig={{ scale: 120 }}
          width={800}
          height={400}
          style={{ width: "100%", height: "100%" }} // make it responsive
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E7EB"
                  stroke="#9CA3AF"
                  className="transition-all hover:fill-indigo-500 hover:cursor-pointer"
                />
              ))
            }
          </Geographies>

          {alumniLocations.map(({ name, coordinates }, index) => (
            <Marker key={index} coordinates={coordinates}>
              <circle r={5} fill="#3B82F6" stroke="#fff" strokeWidth={1.5} />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: "system-ui", fill: "#374151", fontSize: 12 }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

    </section>

      {/* Alumni Hall of Fame Carousel */}
     <section className="bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-black py-24 px-6">
      <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-12">
        Alumni Hall of Fame
      </h2>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {scrollData.map((alumni, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center w-56">
              <img
                src={alumni.img}
                alt={alumni.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-amber-500 shadow-lg"
              />
              <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {alumni.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{alumni.role}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

      {/* Top Recruiters */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold font-serif text-neutral-900 dark:text-neutral-100 text-center mb-12">
          Top Recruiters
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-center">
          {recruiters.map((company, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">{company}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold font-serif text-neutral-900 dark:text-neutral-100 mb-6">Join the Legacy</h2>
        <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 mb-10">
          Be part of a tradition that inspires generations and shapes the future.
        </p>
        <button onClick={handleContact} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full shadow-md transition">
          Connect with Us
        </button>
      </section>
    </div>
  );
}




