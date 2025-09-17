import React from "react";
import { motion } from "framer-motion";
import FilterCard from "./FilterCard";

const FilterSidebar = ({
  selectedYear,
  setSelectedYear,
  selectedCourse,
  setSelectedCourse,
  selectedBranch,
  setSelectedBranch,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-2 h-screen rounded-xl p-4 relative group overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-700/35 dark:from-black dark:via-black dark:to-gray-700/60 backdrop-blur-lg border border-gray-300/60 dark:border-gray-700/40"
    >
      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-gray-400 dark:to-gray-600 rounded-full opacity-40 animate-pulse" />

      <FilterCard
        title="Year"
        value={selectedYear}
        onChange={setSelectedYear}
        options={["2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
      />
      <FilterCard
        title="Course"
        value={selectedCourse}
        onChange={setSelectedCourse}
        options={["B.Tech", "BBA", "MBA", "B.Pharma", "MCA"]}
      />
      <FilterCard
        title="Branch"
        value={selectedBranch}
        onChange={setSelectedBranch}
        options={[
          "Information Technology",
          "Computer Science",
          "Electronics Engg",
          "Electrical Engg",
          "Mechanical Engg",
          "Civil Engineering",
          "Chemical Engg",
        ]}
      />
    </motion.div>
  );
};

export default FilterSidebar;
