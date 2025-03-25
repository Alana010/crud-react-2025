import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import OrderProducts from "../components/OrderProducts"; 
import { getLocalDate } from "../utils/dateUtils";
import "../index.css"; 

const AddEditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [order, setOrder] = useState({
    orderNumber: "",
    date: getLocalDate(),
    status: "Pending",
    totalProducts: 0,
    finalPrice: 0
  });

  useEffect(() => {
    if (isEdit) {
      const fetchOrder = async () => {
        try {
          const response = await api.get(`/orders/${id}`);
          const productResponse = await api.get(`/order-products/${id}`);
          setOrder({
            ...response.data,
            totalProducts: productResponse.data.reduce((acc, item) => acc + item.quantity, 0) || 0,
            finalPrice: productResponse.data.reduce((acc, item) => acc + (parseFloat(item.total_price) || 0), 0)
          });

          if (response.data.status === "Completed") {
            alert("Can´t edit a competed order.");
            navigate("/my-orders");
          }
        } catch (error) {
          console.error("Error obtain data:", error);
        }
      };
      fetchOrder();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/orders/${id}`, order);
      } else {
        await api.post("/orders", order);
      }
      navigate("/my-orders");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="container">
      <h1>{isEdit ? "✏️ Edit Order" : "➕ Add Order"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Order #:</label>
        <input type="text" value={order.orderNumber} onChange={(e) => setOrder({ ...order, orderNumber: e.target.value })} required />

        <label>date:</label>
        <input type="date" value={order.date} onChange={(e) => setOrder({ ...order, date: e.target.value })} required />

        <label>Status:</label>
        <select value={order.status} onChange={(e) => setOrder({ ...order, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
        </select>

        <label># Products:</label>
        <input type="text" value={order.totalProducts} readOnly />

        <label>Final Price ($):</label>
        <input type="text" value={order.finalPrice.toFixed(2)} readOnly />

        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>

      {isEdit && <OrderProducts orderId={id} />}
    </div>
  );
};

export default AddEditOrder;



