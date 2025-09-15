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
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="space-y-2 bg-black rounded-xl p-4 border border-gray-700/40"
  >
    <FilterCard
      title="Year"
      value={selectedYear}
      onChange={setSelectedYear}
      options={["2023-2024", "2022-2023", "2021-2022", "2020-2021"]}
    />
    <FilterCard
      title="Course"
      value={selectedCourse}
      onChange={setSelectedCourse}
      options={["Information Technology", "Computer Science", "Electronics Engg", "Mechanical Engg", "Civil Engineering"]}
    />
    <FilterCard
      title="Branch"
      value={selectedBranch}
      onChange={setSelectedBranch}
      options={["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"]}
    />
  </motion.div>
);

export default FilterSidebar;
