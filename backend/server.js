const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const orderProductRoutes = require("./routes/orderProductRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order-products", orderProductRoutes);

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
