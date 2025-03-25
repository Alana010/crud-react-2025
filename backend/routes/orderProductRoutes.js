const express = require("express");
const router = express.Router();
const orderProductController = require("../controllers/orderProductController");

router.get("/:order_id", orderProductController.getOrderProducts);
router.post("/", orderProductController.addProductToOrder);
router.put("/:id", orderProductController.updateOrderProduct);
router.delete("/:id", orderProductController.deleteOrderProduct);

module.exports = router;
