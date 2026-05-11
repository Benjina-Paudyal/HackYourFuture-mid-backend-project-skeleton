import db from "../db/knex.js";

export async function getCart(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;

    let cart = await db("cart")
      .where({ user_id: userId, status: "active" })
      .first();

    if (!cart) {
      [cart] = await db("cart")
        .insert({ user_id: userId, status: "active" })
        .returning("*");
    }

    const items = await db("cart_item")
      .where({ cart_id: cart.id })
      .join("event", "cart_item.event_id", "event.id")
      .select(
        "cart_item.id",
        "cart_item.quantity",
        "event.title",
        "event.price",
        "event.currency",
      );

    res.json({ cart, items });
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart" });
  }
}

export async function addItem(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;
    const { event_id, quantity = 1 } = req.body;

    if (!Number.isInteger(event_id)) {
      return res.status(400).json({ error: "event_id must be a valid integer" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "quantity must be a positive integer" });
    }

    let cart = await db("cart")
      .where({ user_id: userId, status: "active" })
      .first();

    if (!cart) {
      [cart] = await db("cart")
        .insert({ user_id: userId, status: "active" })
        .returning("*");
    }

    const existing = await db("cart_item")
      .where({ cart_id: cart.id, event_id })
      .first();

    if (existing) {
      await db("cart_item")
        .where({ id: existing.id, cart_id: cart.id }) // 🔒 safety fix
        .update({
          quantity: existing.quantity + quantity,
        });

      return res.json({ message: "Quantity updated" });
    }

    await db("cart_item").insert({
      cart_id: cart.id,
      event_id,
      quantity,
    });

    return res.status(201).json({ message: "Item added" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to add item" });
  }
}


export async function updateItem(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ error: "quantity is required" });
    }

    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({
        error: "quantity must be a valid integer (0 or greater)",
      });
    }

    const cart = await db("cart")
      .where({ user_id: userId, status: "active" })
      .first();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (parsedQuantity === 0) {
      const deleted = await db("cart_item")
        .where({ id: itemId, cart_id: cart.id })
        .del();

      if (!deleted) {
        return res.status(404).json({ error: "Item not found" });
      }

      return res.json({ message: "Item removed" });
    }

    const updated = await db("cart_item")
      .where({ id: itemId, cart_id: cart.id })
      .update({ quantity: parsedQuantity });

    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.json({ message: "Item updated" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update item" });
  }
}

export async function deleteItem(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const userId = req.user.id;
    const { itemId } = req.params;

    // Find active cart
    const cart = await db("cart")
      .where({
        user_id: userId,
        status: "active",
      })
      .first();

    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    // Delete item from user's cart
    const deleted = await db("cart_item")
      .where({
        id: itemId,
        cart_id: cart.id,
      })
      .del();

    if (!deleted) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    return res.json({
      message: "Item removed",
    });

  } catch (err) {

    return res.status(500).json({
      error: "Failed to delete item",
    });
  }
}

export async function checkout(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;

    const result = await db.transaction(async (trx) => {

      // Get active cart
      const cart = await trx("cart")
        .where({ user_id: userId, status: "active" })
        .first();

      if (!cart) {
        throw new Error("Cart not found");
      }

      // Get cart items
      const cartItems = await trx("cart_item")
        .where({ cart_id: cart.id });

      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Calculate total
      let total = 0;

      for (const item of cartItems) {
        const event = await trx("event")
          .where({ id: item.event_id })
          .first();

        total += Number(event.price) * item.quantity;
      }

      // Create order
      const [order] = await trx("customer_order")
        .insert({
          user_id: userId,
          total_amount: total,
          status: "completed"
        })
        .returning("*");

      // Create order items
      for (const item of cartItems) {
        const event = await trx("event")
          .where({ id: item.event_id })
          .first();

        await trx("order_item").insert({
          order_id: order.id,
          event_id: item.event_id,
          quantity: item.quantity,
          price: event.price
        });
      }

      // Clear cart items
      await trx("cart_item")
        .where({ cart_id: cart.id })
        .del();

      // Reset cart
      await trx("cart")
        .where({ id: cart.id })
        .update({ status: "completed" });

      return order;
    });

    return res.json({
      message: "Checkout successful",
      order: result
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message || "Checkout failed"
    });
  }
}