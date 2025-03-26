const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const orderProductRoutes = require("./routes/orderProductRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order-products", orderProductRoutes);

// init server
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server run in  http://0.0.0.0:${PORT}`);
});
