import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getOrders, getOrderById } from "../controllers/order.controller.js";

const orderRouter = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter.get("/", authMiddleware, getOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get single order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
orderRouter.get("/:orderId", authMiddleware, getOrderById);

export default orderRouter;