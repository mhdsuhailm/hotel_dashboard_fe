import React from "react";
import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="w-full h-15 flex items-center justify-between px-6 bg-[#140F0F] border-b border-[#1F1A1A]">
      
      {/* LEFT */}
      <div>
        <p className="text-xs text-gray-400">Hello,</p>
        <h2 className="text-sm font-semibold text-white">
          Oliver Bennett. Welcome back to FeAST on the rise Admin!
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        
        <div className="flex items-center bg-[#1E1919] px-3 h-10 rounded-lg w-60">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-white w-full"
          />
        </div>

        <div className="p-2 bg-[#1E1919] rounded-lg">
          <Bell size={18} className="text-gray-300" />
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-xs">
            <p className="text-white">Oliver Bennett</p>
            <p className="text-gray-400">Admin</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topbar;