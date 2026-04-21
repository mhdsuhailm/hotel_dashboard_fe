import React, { useEffect, useState, useRef } from "react";

const BestItemCard = ({ items }) => {
  const [index, setIndex] = useState(0);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // SWIPE HANDLERS
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current - touchEnd.current > 50) {
      setIndex((prev) => (prev + 1) % items.length);
    }

    if (touchEnd.current - touchStart.current > 50) {
      setIndex((prev) =>
        prev === 0 ? items.length - 1 : prev - 1
      );
    }
  };

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  const item = items[index];

  return (
    <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-3 h-full">
      
      {/* TITLE */}
      <h3 className="text-white text-sm mb-2">
        Weekly Best Item
      </h3>

      {/* CARD */}
      <div
        className="relative bg-[#1E1919] rounded-2xl h-40 flex flex-col items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        {/* GLOW (YOU REMOVED THIS — ADD BACK) */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-orange-500/20 blur-2xl" />

        {/* FADE CONTENT */}
        <div
          key={item.name}
          className="flex flex-col items-center justify-center animate-fade"
        >
          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-contain mb-2 z-10"
          />

          {/* NAME */}
          <p className="text-white text-sm font-medium z-10">
            {item.name}
          </p>

          {/* DETAILS */}
          <div className="flex justify-between w-full px-4 mt-1 text-xs text-gray-400 z-10 gap-4">
            <span>Orders {item.orders}</span>
            <span className="text-orange-400 font-semibold">
              ${item.price}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BestItemCard;