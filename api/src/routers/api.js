import express from "express";
import eventsRouter from "#routers/events.js";
import authRouter from "#routers/auth.js";
import cartRouter from "#routers/cart.js";
import orderRouter from "#routers/order.js";



const router = express.Router();

router.use("/auth", authRouter);
router.use("/events", eventsRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);

export default router;