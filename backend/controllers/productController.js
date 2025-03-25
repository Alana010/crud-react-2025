const db = require("../config/db");

// Obtener todos los productos
const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

// Crear un nuevo producto
const createProduct = (req, res) => {
  const { name, unit_price } = req.body;
  db.query(
    "INSERT INTO products (name, unit_price) VALUES (?, ?)",
    [name, unit_price],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
};

// Editar un producto
const updateProduct = (req, res) => {
  const { name, unit_price } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE products SET name = ?, unit_price = ? WHERE id = ?",
    [name, unit_price, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ id, name, unit_price });
    }
  );
};

// Eliminar un producto
const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Product deleted" });
  });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
