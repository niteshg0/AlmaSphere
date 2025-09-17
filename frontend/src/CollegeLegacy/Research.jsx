import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Lightbulb,
  Rocket,
  Beaker,
  Globe,
  ArrowUpRight,
  Users,
  MapPin,
} from "lucide-react";


export default function ResearchInnovationV2() {
  // --- Dummy data ---
  const metrics = [
    { id: 1, label: "Patents", value: 220, delta: 12, icon: <FlaskConical className="w-5 h-5 text-indigo-600" /> },
    { id: 2, label: "Labs", value: 35, delta: -1, icon: <Beaker className="w-5 h-5 text-green-600" /> },
    { id: 3, label: "Startups", value: 18, delta: 4, icon: <Rocket className="w-5 h-5 text-amber-600" /> },
    { id: 4, label: "Projects", value: 75, delta: 6, icon: <Lightbulb className="w-5 h-5 text-pink-600" /> },
  ];

  const domains = [
    {
      id: "ai",
      title: "AI & ML",
      summary: "Advanced models for healthcare, vision, and language.",
      highlights: ["50+ papers", "3 deployed systems", "Cross-disciplinary teams"],
      color: "from-indigo-500 to-sky-400",
    },
    {
      id: "robotics",
      title: "Robotics",
      summary: "Autonomous systems for inspection and rescue.",
      highlights: ["Field tested", "Modular hardware", "Realtime control"],
      color: "from-emerald-400 to-emerald-600",
    },
    {
      id: "biotech",
      title: "Biotech",
      summary: "Bio-sensing and therapeutic prototyping.",
      highlights: ["Labs accredited", "Clinical partners", "IP portfolio"],
      color: "from-pink-400 to-rose-500",
    },
    {
      id: "quantum",
      title: "Quantum & Sensors",
      summary: "Next-gen sensing and compute research.",
      highlights: ["Prototype devices", "Grant-funded"],
      color: "from-violet-500 to-indigo-600",
    },
  ];

  const spotlights = [
    {
      id: 1,
      title: "Autonomous Drone for Disaster Mapping",
      role: "Robotics Lab",
      summary:
        "Deployed in 2024 flood response — reduced mapping time by 70%. Collaborated with local authorities.",
      img: null,
    },
    {
      id: 2,
      title: "AI Diagnostic Assistant",
      role: "AI & ML Team",
      summary:
        "Clinical pilot in two hospitals. Early results show improved triage accuracy and throughput.",
      img: null,
    },
  ];

  const people = [
    { id: 1, name: "Dr. Aisha Khan", role: "Lead, AI Lab" },
    { id: 2, name: "Prof. Rohit Sen", role: "Head, Robotics" },
    { id: 3, name: "Priya Patel", role: "Bio-engineer" },
  ];

  const partners = [
    { id: 1, name: "MIT", coords: [40.7128, -74.006], type: "University" },
    { id: 2, name: "TU Munich", coords: [48.1351, 11.5820], type: "University" },
    { id: 3, name: "GlobalHealth Co.", coords: [51.5074, -0.1278], type: "Industry" },
       { id: 4, name: "MIT", coords: [40.7128, -74.006], type: "University" },
    { id: 5, name: "TU Munich", coords: [48.1351, 11.5820], type: "University" },
    { id: 6, name: "GlobalHealth Co.", coords: [51.5074, -0.1278], type: "Industry" },
  ];

  // --- State & hooks ---
  const [activeDomain, setActiveDomain] = useState(domains[0].id);
  const [counts, setCounts] = useState(metrics.map(() => 0));
  const countersRef = useRef(null);

   const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const speed = 1; // pixels per frame
    let req;

    const step = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0; // reset to start for infinite loop
      } else {
        container.scrollLeft += speed;
      }
      req = requestAnimationFrame(step);
    };

    req = requestAnimationFrame(step);

    return () => cancelAnimationFrame(req);
  }, []);

  useEffect(() => {
    // Animate counters when component mounts
    const timers = metrics.map((m, i) => {
      const duration = 1200 + i * 200;
      const start = performance.now();
      const from = 0;
      const to = m.value;

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCounts((prev) => {
          const next = [...prev];
          next[i] = Math.round(from + (to - from) * eased);
          return next;
        });
        if (t < 1) requestAnimationFrame(tick);
      };

      return requestAnimationFrame(tick);
    });

    return () => timers.forEach((id) => cancelAnimationFrame(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // small helper renderers
  function MetricCard({ metric, index }) {
    const deltaPositive = metric.delta >= 0;
    return (
      <div className="rounded-xl bg-white dark:bg-slate-800 border p-5 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700">{metric.icon}</div>
          <div className="flex-1">
            <div className="text-sm text-slate-500">{metric.label}</div>
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{counts[index]}</div>
          </div>
          <div className={`text-sm font-medium ${deltaPositive ? "text-green-600" : "text-rose-500"}`}>
            {deltaPositive ? `+${metric.delta}%` : `${metric.delta}%`}
          </div>
        </div>
      </div>
    );
  }

  function DomainCard({ domain }) {
    const isActive = activeDomain === domain.id;
    return (
      <motion.div
        layout
        onClick={() => setActiveDomain(domain.id)}
        className={`cursor-pointer rounded-2xl p-5 min-h-[140px] flex flex-col justify-between border hover:shadow-lg transition ${
          isActive ? "ring-2 ring-offset-2 ring-sky-400 bg-white dark:bg-slate-800" : "bg-gradient-to-br from-white to-white/90 dark:from-slate-900"
        }`}
      >
        <div>
          <div className={`inline-flex items-center gap-3 mb-3`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${domain.color} text-white`}> 
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{domain.title}</div>
              <div className="text-sm text-slate-500">{domain.summary}</div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {domain.highlights.map((h, i) => (
              <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">{h}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // placeholder for 'learn more'
                alert(`Open details for ${domain.title}`);
              }}
              className="inline-flex items-center gap-2 text-sm text-sky-600 hover:underline"
            >
              Learn more <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="text-xs text-slate-400">{isActive ? "Active" : "Tap"}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* HERO */}
      <section className="rounded-2xl p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">Pioneering the Future of Technology</h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">Driving impactful research that translates into real products, startups and societal benefits. Explore domains, success stories and collaboration opportunities.</p>

            <div className="mt-6 flex gap-3">
              <button className="px-5 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition">Apply to Collaborate</button>
              <button className="px-5 py-2 rounded-lg border text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition">Explore Publications</button>
            </div>
          </div>

          <div className="w-full md:w-96 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-sky-500 text-white flex items-center justify-center font-bold">RI</div>
              <div>
                <div className="text-sm text-slate-500">Impact in last year</div>
                <div className="text-2xl font-bold">220+ Patents &amp; 18 Startups</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {metrics.slice(0, 4).map((m) => (
                <div key={m.id} className="rounded-lg p-3 bg-white dark:bg-slate-800 border">
                  <div className="text-xs text-slate-400">{m.label}</div>
                  <div className="font-semibold text-lg">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <MetricCard key={m.id} metric={m} index={i} />
          ))}
        </div>
      </section>

      {/* DOMAINS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Research Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map((d) => (
            <DomainCard key={d.id} domain={d} />
          ))}
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {domains.map((d) =>
              d.id === activeDomain ? (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-lg p-6 bg-white dark:bg-slate-800 border mt-4"
                >
                  <h3 className="text-lg font-semibold">{d.title} — Current Focus</h3>
                  <p className="text-slate-600 dark:text-slate-300 mt-2">{d.summary} — our teams are working on scalable prototypes and collaborative pilots with domain partners.</p>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700"> 
                      <div className="text-xs text-slate-400">Active Projects</div>
                      <div className="font-semibold text-lg">{Math.floor(Math.random() * 30) + 5}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <div className="text-xs text-slate-400">Recent Papers</div>
                      <div className="font-semibold text-lg">{Math.floor(Math.random() * 25) + 1}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <div className="text-xs text-slate-400">Grants</div>
                      <div className="font-semibold text-lg">${Math.floor(Math.random() * 2) + 1}M</div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SPOTLIGHTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Case Studies & Spotlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spotlights.map((s) => (
            <div key={s.id} className="rounded-lg border p-5 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center"> 
                  <Rocket className="w-6 h-6 text-sky-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-500">{s.role}</div>
                  <div className="font-semibold text-lg mt-1">{s.title}</div>
                  <p className="text-slate-600 dark:text-slate-300 mt-2">{s.summary}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-400">Published: 2024</div>
                <div className="flex items-center gap-3">
                  <button className="text-sm text-sky-600 hover:underline inline-flex items-center gap-2">Read more <ArrowUpRight className="w-4 h-4" /></button>
                  <button className="text-sm border px-3 py-1 rounded-md">Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PEOPLE CAROUSEL */}
         <section>
      <h2 className="text-2xl font-semibold mb-4">People Behind Innovation</h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 animate-scroll">
          {[...people, ...people].map((p, idx) => (
            <div
              key={idx}
              className="min-w-[220px] flex-shrink-0 rounded-xl border p-4 bg-white dark:bg-slate-800 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center">
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-slate-500">{p.role}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Selected publications and recent projects are linked on the profile.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind keyframes for infinite scroll */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          width: max-content;
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>

      {/* GLOBAL PARTNERS MAP (Simplified svg) */}
     <section>
  <h2 className="text-2xl font-semibold mb-4">Global Collaborations</h2>
  <div className="grid md:grid-cols-2 gap-6">
    {Array.from({ length: Math.ceil(partners.length / 3) }).map((_, blockIdx) => {
      const blockPartners = partners.slice(blockIdx * 3, blockIdx * 3 + 3);
      return (
        <div
          key={blockIdx}
          className="rounded-xl border p-4 bg-white dark:bg-slate-800 shadow-sm space-y-3"
        >
          {blockPartners.map((pt) => (
            <div
              key={pt.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
            >
              <MapPin className="w-5 h-5 text-rose-500 mt-1" />
              <div>
                <div className="font-semibold">{pt.name}</div>
                <div className="text-xs text-slate-500">{pt.type}</div>
              </div>
              <div className="ml-auto text-xs text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">
                View
              </div>
            </div>
          ))}
        </div>
      );
    })}
  </div>
</section>

      {/* CTA FOOTER */}
      
    </div>
  );
}
