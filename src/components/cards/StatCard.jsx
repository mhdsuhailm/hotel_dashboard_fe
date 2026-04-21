import React from "react";
import MiniChart from "../charts/MiniChart";
const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
  chartData = [],
}) => {
  return (
    <div className="relative bg-[#161212] border border-[#241E1E] rounded-lg p-4 overflow-hidden">
      
      {/* GRAPH GLOW (RIGHT SIDE) */}
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-orange-500/20 to-transparent blur-2xl" />

      {/* CONTENT */}
      <div className="relative z-10">
        
        {/* TITLE */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          {icon}
          {title}
        </div>

        {/* VALUE */}
        <h2 className="text-white text-xl font-semibold">
          {value}
        </h2>

        {/* CHANGE */}
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {change}
          </span>

          <span className="text-xs text-gray-500">
            Since Yesterday
          </span>
        </div>
<MiniChart data={chartData} />
      </div>
    </div>
  );
};

export default StatCard;