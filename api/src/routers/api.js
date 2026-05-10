import express from "express";
import eventsRouter from "#routers/events.js";
import authRouter from "#routers/auth.js";
import cartRouter from "#routers/cart.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/events", eventsRouter);
router.use("/cart", cartRouter);

export default router;