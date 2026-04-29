import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MenuTable from "../components/menu/MenuTable";

const MenuPage = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <div className="flex-1 bg-[#0D0B0A] p-6 overflow-y-auto">
          <MenuTable />
        </div>
      </div>

    </div>
  );
};

export default MenuPage;