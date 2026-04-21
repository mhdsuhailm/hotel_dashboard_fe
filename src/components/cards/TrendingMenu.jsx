import React from "react";

const TrendingMenu = ({ items }) => {
  return (
    <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-3 h-52 flex flex-col">
      
      {/* HEADER */}
      <h3 className="text-white text-sm mb-3">
        Daily Trending Menus
      </h3>

      {/* LIST */}
<div className="flex flex-col gap-2 overflow-y-auto pr-1 h-[calc(100%-30px)] custom-scroll">      
    {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#1E1919] rounded-lg px-2 py-2 hover:bg-[#2A2222] transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-2">
              
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded object-cover"
              />

              <div>
                <p className="text-white text-xs font-medium">
                  {item.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  Order {item.orders}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <p className="text-orange-400 text-xs font-semibold">
              ${item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMenu;