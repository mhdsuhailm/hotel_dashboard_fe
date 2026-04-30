import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashbord";
import Orders from "./pages/Orders";
import Kitchen from "./pages/Kitchen";
import Menu from "./pages/MenuPage";
import AddMenu from "./pages/AddMenu";
import EditMenu from "./components/menu/EditMenu";
import UsersPage from "./pages/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/edit-menu/:id" element={<EditMenu />} />
        <Route path="/customer" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;