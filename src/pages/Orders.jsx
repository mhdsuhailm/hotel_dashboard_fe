import React from 'react';
import Sidebar from "../components/layout/Sidebar";

const Orders = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* <DashboardCards />
        <OrderTable /> */}
      </div>
       <div>
      <h1>Orders</h1>
      <p>This is a simple orders page.</p>
    </div>
    </div>
   
  );
};

export default Orders;
