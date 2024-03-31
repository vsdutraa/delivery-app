import express from "express";
const router = express.Router();

import {
  getOrders,
  getOrderById,
  createOrder,
  getOrdersByStatus,
  updateOrderStatus,
  deleteOrder,
} from "../models/orderModel.js";
import { getCustomerById } from "../models/customerModel.js";

router.use(express.json());

// get all orders
router.get("/", async (req, res) => {
  const orders = await getOrders();
  res.status(200).send(orders);
});

// get order by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("No id was provided");

  const order = await getOrderById(id);
  if (!order) return res.status(404).send("The requested order does not exist");

  res.status(200).send(order);
});

// get order by status
router.get("/search/:status", async (req, res) => {
  const status = req.params.status;
  if (!status) return res.status(404).send("No status was provided");

  const orders = await getOrdersByStatus(status);
  res.status(200).send(orders);
});

// create new order
router.post("/", async (req, res) => {
  const order = req.body;
  const { customerId } = order;

  const customer = await getCustomerById(customerId);
  if (!customer) res.status(400).send("Invalid customer");

  const newOrder = await createOrder(order);
  res.status(201).send(newOrder);
});

// update order status
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("No id was provided");
  const { status } = req.body;

  const validStatus = ["pending", "processing", "completed"];
  if (!validStatus.includes(status))
    return res.status(400).send("Invalid status");

  const updated = await updateOrderStatus(id, status);
  if (updated) res.status(200).send(true);
});

// delete order
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("No id was provided");

  const deleted = await deleteOrder(id);
  if (deleted) res.status(200).send(true);
});

export default router;
