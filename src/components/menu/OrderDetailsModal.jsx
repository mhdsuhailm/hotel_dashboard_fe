import axios from "axios";

const OrderDetailsModal = ({ order, onClose, refreshOrders, onStatusChange }) => {
  if (!order) return null;

  // convert items string → array
  // const itemsList = order.items ? order.items.split(",") : [];

  const updateStatus = async (newStatus) => {
    try {
      await axios.put("http://localhost:5000/api/orders/status", {
        // await axios.put(`${import.meta.env.VITE_API_URL}/api/orders/update-status`, {
        orderId: order.id,
        newStatus: newStatus
      });

      alert("Status updated");
      await refreshOrders(); // refresh table
      // onClose();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Invalid status flow");
    }
  };

  const getStatusColor = (status) => {
    if (status === "completed") return "bg-green-500/20 text-green-400";
    if (status === "ready") return "bg-green-500/20 text-green-400";
    if (status === "confirmed") return "bg-blue-500/20 text-blue-400";
    if (status === "preparing") return "bg-yellow-500/20 text-yellow-400";
    if (status === "cancelled") return "bg-red-500/20 text-red-400";
    return "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#161212] text-white p-6 rounded-xl w-[600px] max-h-[85vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Order #{order.order_number}</h2>
          <button onClick={onClose} className="text-red-400 text-xl">
            ✕
          </button>
        </div>

        {/* STATUS BADGES */}
        <div className="flex gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded text-xs ${getStatusColor(order.status)}`}
          >
            {order.status}
          </span>

          <span
            className={`px-3 py-1 rounded text-xs ${getStatusColor(order.payment_status)}`}
          >
            {order.payment_status || "pending"}
          </span>
        </div>

        {/* CUSTOMER */}
        <div className="bg-[#1E1919] p-4 rounded mb-4">
          <p>
            <b>Name:</b> {order.name}
          </p>
          <p>
            <b>Phone:</b> {order.phone_number}
          </p>
          <p>
            <b>Address:</b> {order.address}
          </p>
        </div>

        {/* ITEMS */}
        <div className="bg-[#1E1919] p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Items</h3>

          {/* {itemsList.map((item, index) => ( */}
          {Array.isArray(order.items) &&
            order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-[#2A2A2A] py-2"
              >
                <span>{item.name}</span>
                <span>x{item.qty}</span>
                <span>₹{item.price}</span>
                {/* <span>{item.trim()}</span> */}
              </div>
            ))}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span className="text-orange-400">₹{order.total_amount}</span>
        </div>

        {/* TIMELINE */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Progress</h3>

          <div className="flex justify-between text-xs text-gray-400">
            <span>Confirmed</span>
            <span>Preparing</span>
            <span>Ready</span>
            <span>Served</span>
            <span>Completed</span>
          </div>

          <div className="h-2 bg-[#2A2A2A] rounded mt-2 relative">
            <div
              className="h-2 bg-green-400 rounded"
              style={{
                width:
                  order.status === "confirmed"
                    ? "20%"
                    : order.status === "preparing"
                      ? "40%"
                      : order.status === "ready"
                        ? "60%"
                        : order.status === "served"
                          ? "80%"
                          : order.status === "completed"
                            ? "100%"
                            : "10%"
              }}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        {/* <div className="flex gap-2 flex-wrap">

          {order.status === "confirmed" && (
            <>
              <button onClick={() => updateStatus("preparing")}
                className="bg-yellow-500 px-3 py-1 rounded text-sm">Start Preparing</button>
              <button onClick={() => updateStatus("cancelled")}
                className="bg-red-500 px-3 py-1 rounded text-sm">Cancel</button>
            </>
          )}

          {order.status === "preparing" && (
            <button onClick={() => updateStatus("ready")}
              className="bg-green-500 px-3 py-1 rounded text-sm">Mark Ready</button>
          )}

          {order.status === "ready" && (
            <button onClick={() => updateStatus("served")}
              className="bg-blue-500 px-3 py-1 rounded text-sm">Serve</button>
          )}

          {order.status === "served" && (
            <button onClick={() => updateStatus("completed")}
              className="bg-green-600 px-3 py-1 rounded text-sm">Complete</button>
          )}

        </div> */}
        <div className="flex gap-2 flex-wrap">
          {order.allowed_next?.map((status) => (
            <button
              key={status}
              onClick={async () => {
                console.log("CLICK WORKING:", order.id, status);
                await onStatusChange(order.id, status);
                onClose();
              }}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 rounded-lg"
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
