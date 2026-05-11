import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getCart,
  addItem,
  updateItem,
  deleteItem,
  checkout
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns cart with items
 *       401:
 *         description: Unauthorized
 */
cartRouter.get("/", authMiddleware, getCart);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added
 *       400:
 *         description: Invalid input
 */
cartRouter.post("/items", authMiddleware, addItem);


/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item not found
 */
cartRouter.put("/items/:itemId", authMiddleware, updateItem);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removed
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 */
// DELETE item
cartRouter.delete(
  "/items/:itemId",
  authMiddleware,
  deleteItem
);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout cart and create order
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Cart is empty or invalid state
 *       401:
 *         description: Unauthorized
 */
// CHECKOUT
cartRouter.post(
  "/checkout",
  authMiddleware,
  checkout
);
export default cartRouter;