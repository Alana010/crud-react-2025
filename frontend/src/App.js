import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyOrders from "./pages/MyOrders";
import AddEditOrder from "./pages/AddEditOrder";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir la página principal a MyOrders */}
        <Route path="/" element={<Navigate to="/my-orders" />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/add-order/:id?" element={<AddEditOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
