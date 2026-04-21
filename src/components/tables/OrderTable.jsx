// import { useEffect,useState } from "react";
// import axios from 'axios';
// const OrderTable = () => {

//   const[orders, setOrders] = useState([]);
//   useEffect (() =>{
//     axios
//     .get("http://localhost:5000/api/admin/orders")
//     .then((res) => {
//       console.log(res.data);
//       setOrders(res.data);
      
//     })
//     .catch((err) => console.log(err));
//   },[])
//   return (
//     <div className="bg-white p-4 rounded-xl shadow">
//       <h2 className="text-lg font-bold mb-4">Orders</h2>

//       <table className="w-full text-left">
//         <thead>
//           <tr className="border-b">
//             <th>Order ID</th>
//             <th>Name</th>
//             <th>Phone Number</th>
//             <th>Address</th>
//             <th>Status</th>
//             <th>Total</th>
//             <th>Delivery Contact</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id} className="p-4">
//               <td>{order.order_id}</td>
//               <td>{order.name}</td>
//               <td>{order.phone_number}</td>
//               <td>{order.address || "N/A"}</td>
//               <td className="text-yellow-500">{order.status}</td>
//               <td>{order.total_amount}</td>
//               <td>{order.delivery_contact}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderTable;

import { useEffect, useState } from "react";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      // .get("http://localhost:5000/api/admin/orders")
      .get(`${import.meta.env.VITE_API_URL}/api/admin/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  // STATUS STYLE
  const getStatusStyle = (status) => {
    if (status === "completed")
      return "bg-green-500/20 text-green-400";
    if (status === "pending")
      return "bg-blue-500/20 text-blue-400";
    if (status === "cancelled")
      return "bg-red-500/20 text-red-400";
    return "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-4">
      
      {/* TITLE */}
      <h2 className="text-white text-sm mb-4">
        Recent Orders
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          
          {/* HEADER */}
          <thead className="text-xs text-gray-400 border-b border-[#241E1E]">
            <tr>
              <th className="pb-3 text-left">Order ID</th>
              <th className="pb-3 text-left">Name</th>
              <th className="pb-3 text-left">Phone</th>
              <th className="pb-3 text-left">Address</th>
              <th className="pb-3 text-left">Status</th>
              <th className="pb-3 text-left">Total</th>
              <th className="pb-3 text-left">Delivery Contact</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="border-b border-[#1E1919] hover:bg-[#1E1919] transition"
              >
                {/* ORDER ID */}
                <td className="py-3">{order.order_id}</td>

                {/* NAME */}
                <td className="py-3">{order.name}</td>

                {/* PHONE */}
                <td>{order.phone_number}</td>

                {/* ADDRESS */}
                <td className="max-w-[200px] truncate">
                  {order.address || "N/A"}
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* TOTAL */}
                <td className="text-orange-400 font-semibold">
                  ₹{order.total_amount}
                </td>

                {/* DELIVERY CONTACT */}
                <td>{order.delivery_contact}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default OrderTable;