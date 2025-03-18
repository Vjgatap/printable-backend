import express from "express";
import { getOrder, getOrdersByMerchant, createOrder, updateOrder } from "../controller/orderController.ts";

const router = express.Router();

// Route to get a single order by its ID
router.get("/:id", getOrder);

// Route to get all orders for a merchant by merchant ID
router.get("/merchant/:merchantId", getOrdersByMerchant);

// Route to create a new order
router.post("/", createOrder);

// Route to update an existing order by its ID
router.patch("/:id", updateOrder);

export default router;
