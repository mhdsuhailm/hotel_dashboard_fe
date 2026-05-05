import { useEffect, useState } from "react";
import axios from "axios";
import OrderDetailsModal from "../menu/OrderDetailsModal";
const OrderTable = () => {
  const [orders, setOrders] = useState([]);
const [selectedOrder, setSelectedOrder] = useState(null);
const handleStatusChange = async (orderId, newStatus) => {
  try {
    console.log("FUNCTION CALLED", orderId, newStatus);

    // await axios.put("http://localhost:5000/api/orders/status", {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/orders/status`, {
      orderId,
      newStatus,
    });

    console.log("AFTER API CALL");

    fetchOrders(); // refresh data
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
  }
};
const fetchOrders = async () => {
  try {
    // const res = await axios.get("http://localhost:5000/api/orders/orders");
  const res = axios.get(`${import.meta.env.VITE_API_URL}/api/orders/orders`);

    console.log("FRESH DATA:", res.data); // 🔥 DEBUG

    setOrders([...res.data]); 
    if (selectedOrder) {
      const updated = res.data.find(o => o.id === selectedOrder.id);
      setSelectedOrder(updated);
    }
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchOrders();
}, []);
  useEffect(() => {
    axios
      // .get("http://localhost:5000/api/orders/orders")
      .get(`${import.meta.env.VITE_API_URL}/api/orders/orders`)
      .then((res) => {
        console.log(res.data);
        // setOrders(res.data);
        setOrders([...res.data]); // 🔥 IMPORTANT (new reference)
      })
      .catch((err) => console.log(err));
  }, []);

  // STATUS STYLE
  const getStatusStyle = (status) => {
    if (status === "completed")
      return "bg-green-500/20 text-green-400";
    if (status === "ready")
      return "bg-green-500/20 text-green-400";
    if (status === "paid")
      return "bg-green-500/20 text-green-400";
    if (status === "confirmed")
      return "bg-blue-500/20 text-blue-400";
    if (status === "pending")
      return "bg-red-500/20 text-red-400";
    if (status === "cancelled")
      return "bg-red-500/20 text-red-400";
    return "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="h-full flex flex-col bg-[#161212] border border-[#241E1E] rounded-xl p-4 overflow-hidden">      
      {/* TITLE */}
      <h2 className="text-white text-sm mb-4">
        Recent Orders
      </h2>

      {/* TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left text-gray-300">
          
          {/* HEADER */}
          <thead className='sticky top-0 bg-[#161212] z-10 text-gray-400 border-b border-[#241E1E]'>
            <tr>
              <th className="pb-3 text-left">Order ID</th>
              <th className="pb-3 text-left">Name</th>
              <th className="pb-3 text-left">Phone</th>
              <th className="pb-3 text-left">Address</th>
              <th className="pb-3 text-left">Status</th>
              <th className="pb-3 text-left">Payment Status</th>
              <th className="pb-3 text-left">Total</th>
              <th className="pb-3 text-left">Delivery Contact</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#1E1919] hover:bg-[#1E1919] transition"
              >
                {/* ORDER ID */}
                {/* <td className="py-3">ORD-{order.order_number}</td> */}
                <td
                  className="py-3 text-blue-400 cursor-pointer hover:underline"
                  onClick={() => setSelectedOrder(order)}
                >
                  ORD-{order.order_number}
                </td>

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
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusStyle(
                      order.payment_status
                    )}`}
                  >
                    {order.payment_status}
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
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            refreshOrders={fetchOrders}
            onStatusChange={handleStatusChange}   // 🔥 ADD THIS
          />
        )}
      </div>
    </div>
  );
};

export default OrderTable;