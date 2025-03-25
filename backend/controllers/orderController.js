
const db = require('../config/db');

// Obtener todos los pedidos
const getOrders = (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(results);
  });
};

// Crear un nuevo pedido
const createOrder = (req, res) => {
  const { orderNumber, date, status } = req.body;
  db.query('INSERT INTO orders (orderNumber, date, status) VALUES (?, ?, ?)',
    [orderNumber, date, status],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
};

// Editar un pedido
const updateOrder = (req, res) => {
  const { orderNumber, date, status } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE orders SET orderNumber = ?, date = ?, status = ? WHERE id = ?',
    [orderNumber, date, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ id, orderNumber, date, status });
    }
  );
};

// Eliminar un pedido
const deleteOrder = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM orders WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Order deleted' });
  });
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
};