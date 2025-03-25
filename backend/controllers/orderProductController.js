const db = require("../config/db");

// Obtener los productos de una orden
const getOrderProducts = (req, res) => {
  const { order_id } = req.params;
  db.query(
    "SELECT op.id, p.name, p.unit_price, op.quantity, op.total_price FROM order_products op JOIN products p ON op.product_id = p.id WHERE op.order_id = ?",
    [order_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(results);
    }
  );
};

// Agregar un producto a una orden
const addProductToOrder = (req, res) => {
  const { order_id, product_id, quantity } = req.body;

  // Obtener precio del producto
  db.query("SELECT unit_price FROM products WHERE id = ?", [product_id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });

    const unit_price = results[0].unit_price;
    const total_price = unit_price * quantity;

    // Insertar el producto en la orden
    db.query(
      "INSERT INTO order_products (order_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)",
      [order_id, product_id, quantity, total_price],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, order_id, product_id, quantity, total_price });
      }
    );
  });
};

// Editar la cantidad de un producto en una orden
const updateOrderProduct = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Obtener el precio del producto
  db.query("SELECT p.unit_price FROM order_products op JOIN products p ON op.product_id = p.id WHERE op.id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Product in order not found" });

    const unit_price = results[0].unit_price;
    const total_price = unit_price * quantity;

    // Actualizar la cantidad y el precio total
    db.query(
      "UPDATE order_products SET quantity = ?, total_price = ? WHERE id = ?",
      [quantity, total_price, id],
      (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id, quantity, total_price });
      }
    );
  });
};

// Eliminar un producto de una orden
const deleteOrderProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM order_products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Product removed from order" });
  });
};

module.exports = {
  getOrderProducts,
  addProductToOrder,
  updateOrderProduct,
  deleteOrderProduct,
};
