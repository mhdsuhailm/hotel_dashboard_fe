import React from "react";

const getStatusStyle = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-yellow-500/20 text-yellow-400";
    case "preparing":
      return "bg-orange-500/20 text-orange-400";
    case "ready":
      return "bg-green-500/20 text-green-400";
    case "completed":
      return "bg-gray-500/20 text-gray-400";
    case "cancelled":
    case "rejected":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-blue-500/20 text-blue-400";
  }
};

const OrderCard = ({ order, onStatusChange }) => {
  return (
    <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-4 w-full">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-white font-semibold text-sm">
            ORD-{String(order.order_number).padStart(3, "0")}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(order.created_at).toLocaleTimeString()}
          </p>
        </div>

        {/* STATUS */}
        <span className={`text-xs px-2 py-1 rounded ${getStatusStyle(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* ITEMS */}
      <div className="space-y-2 mb-3">
        {order.items?.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-white">{item.name}</span>
            <span className="text-white">x{item.qty}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="text-xs text-gray-400 mb-3">
        {order.items?.length} items
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2">
        
        {order.status === "confirmed" && (
          <>
            <button
              onClick={() => onStatusChange(order.id, "preparing")}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 rounded-lg"
            >
              Accept
            </button>

            <button
              onClick={() => onStatusChange(order.id, "rejected")}
              className="flex-1 border border-red-500 text-red-400 text-xs py-2 rounded-lg"
            >
              Reject
            </button>
          </>
        )}

        {order.status === "preparing" && (
          <button
            onClick={() => onStatusChange(order.id, "ready")}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-2 rounded-lg"
          >
            Mark Ready
          </button>
        )}

      </div>
    </div>
  );
};

export default OrderCard;