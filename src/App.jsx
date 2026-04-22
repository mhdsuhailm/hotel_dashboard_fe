import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashbord";
import Orders from "./pages/Orders";
import Kitchen from "./pages/Kitchen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kitchen" element={<Kitchen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;