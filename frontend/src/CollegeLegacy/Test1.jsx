import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BarChart3, Briefcase, Users } from "lucide-react";

export default function PlacementStats() {
  // Sample Data
  const salaryData = [
    { branch: "CSE", year: 2021, avg: 12, highest: 45, median: 10 },
    { branch: "CSE", year: 2022, avg: 13, highest: 48, median: 11 },
    { branch: "ECE", year: 2021, avg: 9, highest: 32, median: 8 },
    { branch: "ECE", year: 2022, avg: 10, highest: 35, median: 9 },
    { branch: "ME", year: 2021, avg: 7, highest: 25, median: 6 },
    { branch: "ME", year: 2022, avg: 8, highest: 27, median: 7 },
    { branch: "CE", year: 2021, avg: 6, highest: 20, median: 5 },
    { branch: "CE", year: 2022, avg: 7, highest: 22, median: 6 },
  ];

  const sectorData = [
    { name: "IT", value: 45 },
    { name: "Core", value: 25 },
    { name: "Finance", value: 15 },
    { name: "Others", value: 15 },
  ];

  const yearlyTrend = [
    { year: 2021, placed: 380, total: 400 },
    { year: 2022, placed: 420, total: 450 },
    { year: 2023, placed: 470, total: 500 },
    { year: 2024, placed: 510, total: 550 },
  ];

  const COLORS = ["#1F2937", "#3B82F6", "#6B7280", "#2563EB"];

  // Filters
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Filtered Salary Data
  const filteredSalaryData = salaryData.filter((d) => 
    (selectedBranch === "All" || d.branch === selectedBranch) &&
    (selectedYear === "All" || d.year === parseInt(selectedYear))
  );

  const branches = ["All", "CSE", "ECE", "ME", "CE"];
  const years = ["All", 2021, 2022];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-800">
          <GraduationCap className="w-8 h-8 text-gray-700" />
          College Placement Statistics
        </h1>
        <p className="text-gray-600 mt-2">Insights into placements across branches and years</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 text-gray-600">
        <select
          className="border rounded px-3 py-2"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          {branches.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select
          className="border rounded px-3 py-2 "
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* Salary Packages by Branch */}
      <Card className="shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <BarChart3 className="w-6 h-6 text-gray-700" />
            Salary Packages by Branch
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={filteredSalaryData}>
              <XAxis dataKey="branch" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg" fill="#3B82F6" name="Average Package (LPA)" />
              <Bar dataKey="highest" fill="#2563EB" name="Highest Package (LPA)" />
              <Bar dataKey="median" fill="#6B7280" name="Median Package (LPA)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sector Distribution */}
      <Card className="shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <Briefcase className="w-6 h-6 text-gray-700" />
            Sector-wise Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {sectorData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Yearly Placement Trend */}
      <Card className="shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <Users className="w-6 h-6 text-gray-700" />
            Yearly Placement Growth
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={yearlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="placed" stroke="#3B82F6" strokeWidth={3} name="Students Placed" />
              <Line type="monotone" dataKey="total" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" name="Total Students" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
