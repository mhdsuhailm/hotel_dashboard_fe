import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import OrderTable from "../components/tables/OrderTable";
const Orders = () => {
  return (
    <div className="h-screen flex overflow-hidden relative">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        <Topbar />

        <div className="flex-1 bg-[#0D0B0A] p-6 overflow-hidden min-w-0 min-h-0">
          <OrderTable />
        </div>
      </div>

    </div>
  );
};

export default Orders;