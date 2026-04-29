// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import OrderCard from "../components/kitchen/OrderCard";

// const KitchenOrders = () => {
//   const [orders, setOrders] = useState([])
//   const getStatusStyle = status => {
//     switch (status) {
//       case 'new':
//         return 'bg-yellow-500/20 text-yellow-400'
//       case 'accepted':
//         return 'bg-blue-500/20 text-blue-400'
//       case 'preparing':
//         return 'bg-orange-500/20 text-orange-400'
//       case 'ready':
//         return 'bg-green-500/20 text-green-400'
//       default:
//         return 'bg-gray-500/20 text-gray-400'
//     }
//   }
//     const handleStatusChange = async (orderId, status) => {
//     try {
//         await axios.put("http://localhost:5000/api/orders/status", {
//         orderId,
//         newStatus: status,
//         });

//         // refresh orders
//         fetchOrders();
//     } catch (err) {
//         console.log(err);
//     }
//     };
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/kitchen/orders')
//       .then(res => setOrders(res.data))
//       .catch(err => console.log(err))
//   }, [])

//   return (
//     // <div className='p-6 bg-[#0D0B0A] min-h-screen text-white'>
//     //   {/* TITLE */}
//     //   <h1 className='text-lg font-semibold mb-6'>Kitchen Orders</h1>

//     //   {/* GRID */}
//     //   <div className='grid grid-cols-3 gap-4'>
//     //     {orders.map(order => (
//     //       <div
//     //         key={order.order_id}
//     //         className='bg-[#161212] border border-[#241E1E] rounded-xl p-4'
//     //       >
//     //         <p className='text-sm text-gray-400'>Order #{order.order_id}</p>

//     //         <p className='text-xs text-gray-500 mb-3'>
//     //           {new Date(order.created_at).toLocaleTimeString()}
//     //         </p>

//     //         {/* ITEMS */}
//     //         <div className='space-y-2'>
//     //           {order.items?.map((item, i) => (
//     //             <div key={i} className='flex justify-between text-sm'>
//     //               <span>{item.name}</span>
//     //               <span>x{item.qty}</span>
//     //             </div>
//     //           ))}
//     //         </div>

//     //         {/* STATUS */}
//     //         <div className='mt-4'>
//     //           {/* <span className='text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400'>
//     //             {order.status}
//     //           </span> */}
//     //           <span
//     //             className={`text-xs px-2 py-1 rounded ${getStatusStyle(
//     //               order.status
//     //             )}`}
//     //           >
//     //             {order.status}
//     //           </span>
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>

//     <div className="grid grid-cols-3 gap-4">
//     {orders.map((order) => (
//         <OrderCard
//         key={order.id}
//         order={order}
//         onStatusChange={handleStatusChange}
//         />
//     ))}
//     </div>
//   )
// }

// export default KitchenOrders
import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import OrderCard from "../components/kitchen/OrderCard";

const KitchenOrders = () => {
  const [orders, setOrders] = useState([]);
const [filter, setFilter] = useState("all");
const filteredOrders = orders.filter((order) => {
  if (filter === "all") return true;
  return order.status === filter;
});
  const fetchOrders = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/kitchen/orders");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/kitchen/orders`);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      // await axios.put("http://localhost:5000/api/orders/status", {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/orders/status`, {

        orderId,
        newStatus: status,
      });

      fetchOrders(); // refresh
    } catch (err) {
      console.log(err);
    console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        
        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="flex-1 bg-[#0D0B0A] p-6 overflow-y-auto">

          {/* TITLE */}
          <h1 className="text-white text-lg font-semibold mb-4">
            Kitchen Orders
          </h1>
          <div className="flex gap-3 mb-4">
  {["all", "confirmed", "preparing", "ready"].map((tab) => (
    <button
      key={tab}
      onClick={() => setFilter(tab)}
      className={`px-4 py-1 rounded-full text-xs capitalize transition ${
        filter === tab
          ? "bg-[#FF7A18] text-white"
          : "bg-[#1E1919] text-gray-400 hover:bg-[#2A2222]"
      }`}
    >
      {tab}
    </button>
  ))}
</div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))} */}
            {filteredOrders.map((order) => {
  console.log("ORDER OBJECT:", order);

  return (
    <OrderCard
      key={order.id}
      order={order}
      onStatusChange={handleStatusChange}
    />
  );
})}
          </div>

        </div>

      </div>
    </div>
  );
};

export default KitchenOrders;