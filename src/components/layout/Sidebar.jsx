import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Menu,
  Users,
  BarChart,
  Star,
  ChefHat,
  UserCheck,
  Info,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Kitchen", icon: ChefHat, path: "/kitchen" },
  { name: "Menu Management", icon: Menu, path: "/menu" },
  { name: "Customer", icon: Users, path: "/customer" },
  { name: "Sales & Analytics", icon: BarChart, path: "/analytics" },
  { name: "Customer Reviews", icon: Star, path: "/reviews" },
  { name: "Staff Management", icon: UserCheck, path: "/staff" },
  { name: "Restaurant Info", icon: Info, path: "/info" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-64 min-w-[16rem] h-full flex flex-col bg-[#0D0B0A] text-white px-4 py-5 relative z-[999]">

      {/* LOGO */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold">
          🍴
        </div>
        <h1 className="text-sm font-semibold">FeAST on the Rise</h1>
      </div>

      {/* MENU */}
      <ul className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 px-3 py-0.5 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: isActive
                  ? "linear-gradient(to top, rgba(255,122,24,0.25), rgba(255,122,24,0.05))"
                  : "transparent",
              }}
              // onMouseEnter={(e) => {
              //   if (!isActive)
              //     e.currentTarget.style.background = "#221A1A";
              // }}
              // onMouseLeave={(e) => {
              //   if (!isActive)
              //     e.currentTarget.style.background = "transparent";
              // }}
            >
              <Icon size={17} className="text-gray-300" />
              <span className={`text-sm ${isActive ? "text-white" : "text-white-300"}`}>
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>

      {/* PUSH DOWN */}
      <div className="flex-1" />

      {/* BOTTOM CARD */}
      <div className="mt-6">
        <div className="relative rounded-3xl p-5 text-center overflow-hidden bg-gradient-to-b from-[#FF7A18] to-[#FFB347]">

          {/* Glow Effect */}
          {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-white/20 blur-2xl" /> */}

          {/* Image */}
          <div className="mb-4 text-4xl">📋</div>

          <p className="text-sm mb-4 text-white">
            Organize your menus <br /> through button below
          </p>

          <button
          onClick={() =>{
            console.log("sidebar clicked");
            navigate("/add-menu")}}
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold pointer-events-auto">
            + Add Menus
          </button>
        </div>
      </div>

    </div>
  );
};
export default Sidebar;
// import React from 'react';
// import { 
//   LayoutDashboard, 
//   ShoppingBag, 
//   MenuSquare, 
//   Users, 
//   BarChart3, 
//   MessageSquareText, 
//   Settings2, 
//   Info, 
//   Settings 
// } from 'lucide-react';

// const Sidebar = () => {
//   const menuItems = [
//     { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
//     { icon: <ShoppingBag size={20} />, label: 'Orders' },
//     { icon: <MenuSquare size={20} />, label: 'Menu Management' },
//     { icon: <Users size={20} />, label: 'Customer' },
//     { icon: <BarChart3 size={20} />, label: 'Sales & Analytics' },
//     { icon: <MessageSquareText size={20} />, label: 'Customer Reviews' },
//     { icon: <Settings2 size={20} />, label: 'Staff Management' },
//     { icon: <Info size={20} />, label: 'Restaurant Info' },
//     { icon: <Settings size={20} />, label: 'Settings' },
//   ];

//   return (
//     <div className="flex flex-col h-screen w-64 bg-[#0D0B0A] text-[#8A817C] p-2 font-sans">
//       {/* Logo Section */}
//       <div className="flex items-center gap-3 px-2 mb-3 mt-2">
//         <div className="bg-[#E66A20] p-1.5 rounded-full">
//             <div className="text-white">🍴</div>
//         </div>
//         <h1 className="text-white text-xl font-semibold tracking-tight">Hungry Fork</h1>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1 space-y-1">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`flex items-center gap-3 px-4 py-1 rounded-lg cursor-pointer transition-all duration-200 group
//               ${item.active 
//                 ? 'bg-gradient-to-b from-[#2A1A14] to-transparent border-l-2 border-[#E66A20] text-white shadow-[inset_10px_0px_20px_-10px_rgba(230,106,32,0.2)]' 
//                 : 'hover:text-white hover:bg-[#1A1614]'
//               }`}
//           >
//             <span className={`${item.active ? 'text-[#E66A20]' : 'group-hover:text-white'}`}>
//               {item.icon}
//             </span>
//             <span className="text-sm font-medium">{item.label}</span>
//           </div>
//         ))}
//       </nav>

//       {/* Bottom CTA Card */}
//       <div className="relative mt-auto overflow-hidden rounded-2xl bg-[#161311] p-6 text-center border border-white/5">
//         {/* The Orange Glow Background */}
//         <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#E66A20] blur-[60px] opacity-30"></div>
        
//         {/* Floating Menu Icon */}
//         <div className="relative mb-4 flex justify-center">
//             <div className="bg-[#B06D4D] p-3 rounded-xl shadow-2xl">
//                 <MenuSquare className="text-white" size={32} />
//             </div>
//         </div>

//         <p className="relative text-xs text-gray-400 mb-4 px-2">
//           Organize your menus through button below
//         </p>

//         <button className="relative w-full bg-gradient-to-b from-[#FF8C42] to-[#E66A20] text-white py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
//           +Add Menus
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;