import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#161212] text-white p-6 rounded-xl w-[500px] max-h-[80vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">Order Details</h2>
          <button onClick={onClose} className="text-red-400">✕</button>
        </div>

        {/* DETAILS */}
        <div className="space-y-3 text-sm">

          <p><b>Order ID:</b> ORD-{order.order_number}</p>
          <p><b>Name:</b> {order.name}</p>
          <p><b>Phone:</b> {order.phone_number}</p>
          <p><b>Address:</b> {order.address}</p>

          <p><b>Status:</b> {order.status}</p>
          <p><b>Payment:</b> {order.payment_status || "pending"}</p>

          <p><b>Total:</b> ₹{order.total_amount}</p>
          <p><b>Delivery Contact:</b> {order.delivery_contact}</p>

          {/* ITEMS */}
          <div>
            <p className="font-semibold mt-3">Items:</p>
            <p className="text-gray-300">{order.items}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetailsModal;