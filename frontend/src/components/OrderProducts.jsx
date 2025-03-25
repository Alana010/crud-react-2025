import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../api/axiosConfig";

Modal.setAppElement("#root"); 

const OrderProducts = ({ orderId }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    api.get(`/order-products/${orderId}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error obtain products:", error));

    api.get("/products")
      .then((response) => setAllProducts(response.data))
      .catch((error) => console.error("Error obtain products:", error));
  }, [orderId]);

  const handleAddProduct = () => {
    if (!productId) return alert("Select a product");
    api.post("/order-products", { order_id: orderId, product_id: productId, quantity })
      .then(() => {
        setProductId("");
        setQuantity(1);
        setModalIsOpen(false); // Close modal
        api.get(`/order-products/${orderId}`)
          .then((response) => setProducts(response.data));
      })
      .catch((error) => console.error("Error adding a product:", error));
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      api.delete(`/order-products/${id}`)
        .then(() => setProducts(products.filter((p) => p.id !== id)))
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <div>
      <h2>🛒 Order Products</h2>
      <button onClick={() => setModalIsOpen(true)}>➕ Add Product </button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} x ${product.unit_price} = ${product.total_price}
            <button onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>

      {/* Modal to add products */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="custom-modal">
        <h2>Add Product</h2>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select a product</option>
          {allProducts.map((product) => (
            <option key={product.id} value={product.id}>{product.name} - ${product.unit_price}</option>
          ))}
        </select>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
        <button onClick={handleAddProduct}>✅ Add</button>
        <button onClick={() => setModalIsOpen(false)}>❌ Cancel</button>
      </Modal>
    </div>
  );
};

export default OrderProducts;

