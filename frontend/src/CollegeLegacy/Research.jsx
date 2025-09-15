import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Lightbulb, Rocket, Beaker } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function ResearchInnovation() {
  const researchStats = [
    { id: 1, title: "Patents Filed", value: 220, icon: <FlaskConical className="w-6 h-6 text-indigo-600" /> },
    { id: 2, title: "Research Labs", value: 35, icon: <Beaker className="w-6 h-6 text-green-600" /> },
    { id: 3, title: "Startups Incubated", value: 18, icon: <Rocket className="w-6 h-6 text-amber-600" /> },
    { id: 4, title: "Ongoing Projects", value: 75, icon: <Lightbulb className="w-6 h-6 text-pink-600" /> },
  ];

  const researchDistribution = [
    { name: "AI & ML", value: 40 },
    { name: "Robotics", value: 25 },
    { name: "Biotech", value: 20 },
    { name: "Others", value: 15 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Research & Innovation</h1>
        <p className="text-gray-600">Breakthrough patents, labs & startups driving innovation</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {researchStats.map((stat) => (
          <Card key={stat.id} className="hover:shadow-lg transition-all rounded-xl">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
              <p className="text-gray-600 text-center">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Research Distribution Pie Chart */}
      <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-indigo-600" /> Research Areas Distribution
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={researchDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {researchDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Highlight Section */}
      <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Highlights</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Filed 50+ patents in AI & Robotics in 2024</li>
            <li>Established 5 new research labs for emerging technologies</li>
            <li>Incubated 10+ startups focusing on biotech and robotics</li>
            <li>Collaboration with international universities and companies</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
