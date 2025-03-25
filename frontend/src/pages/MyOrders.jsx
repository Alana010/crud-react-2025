import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../index.css"; // styles

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        const ordersWithDetails = await Promise.all(
          response.data.map(async (order) => {
            try {
              const productResponse = await api.get(`/order-products/${order.id}`);
              return {
                ...order,
                totalProducts: productResponse.data.reduce((acc, item) => acc + item.quantity, 0) || 0,
                finalPrice: productResponse.data.reduce((acc, item) => acc + (parseFloat(item.total_price) || 0), 0)
              };
            } catch {
              return { ...order, totalProducts: 0, finalPrice: 0 };
            }
          })
        );
        setOrders(ordersWithDetails);
      } catch (error) {
        console.error("Error obtain orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this order?")) {
      try {
        await api.delete(`/orders/${id}`);
        setOrders(orders.filter((order) => order.id !== id));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>📦 My Orders</h1>
      <button onClick={() => navigate("/add-order")}>➕ Add Order</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order #</th>
            <th>date</th>
            <th>Status</th>
            <th># Products</th>
            <th>Final Price($)</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(({ id, orderNumber, date, status, totalProducts, finalPrice }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{orderNumber}</td>
                <td>{date}</td>
                <td>{status}</td>
                <td>{totalProducts}</td>
                <td>${Number(finalPrice).toFixed(2)}</td>
                <td>
                  <button 
                    onClick={() => navigate(`/add-order/${id}`)}
                    disabled={status === "Completed"}
                  >
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleDelete(id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7">There is not register orders.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;




  
