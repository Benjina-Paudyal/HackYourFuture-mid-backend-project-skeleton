import db from "../db/knex.js";

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       401:
 *         description: Unauthorized
 */
export async function getOrders(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;

    const orders = await db("customer_order")
      .where({ user_id: userId })
      .orderBy("id", "desc");

    res.json({ orders });

  } catch (err) {
    res.status(500).json({ error: "Failed to get orders" });
  }
}

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details with items
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
export async function getOrderById(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await db("customer_order")
      .where({ id: orderId, user_id: userId })
      .first();

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const items = await db("order_item")
      .where({ order_id: order.id })
      .join("event", "order_item.event_id", "event.id")
      .select(
        "order_item.id",
        "order_item.quantity",
        "order_item.price",
        "event.title"
      );

    res.json({ order, items });

  } catch (err) {
    res.status(500).json({ error: "Failed to get order" });
  }
}