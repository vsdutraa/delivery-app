import express from "express";
const router = express.Router();

import {
  getOrderItemById,
  getOrderItemsByOrderId,
  getOrderItems,
  createOrderItem,
  deleteOrderItem,
} from "../models/orderItemModel.js";
import { getOrderById } from "../models/orderModel.js";
import { getItemById } from "../models/itemModel.js";

router.use(express.json());

// get all order items
router.get("/", async (req, res) => {
  const orderItems = await getOrderItems();
  res.status(200).send(orderItems);
});

// get (ORDER ITEM) by (ORDER) id
router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) return res.status(404).send("No id was provided");

  const orderItems = await getOrderItemsByOrderId(orderId);
  res.status(200).send(orderItems);
});

// create order item
router.post("/", async (req, res) => {
  const orderItem = req.body;
  const { orderId, itemId, itemQuantity } = orderItem;

  const order = await getOrderById(orderId);
  if (!order) return res.status(400).send("Invalid order id");

  const item = await getItemById(itemId);
  if (!item) return res.status(400).send("Invalid item id");

  if (!itemQuantity || itemQuantity <= 0)
    return res.status(400).send("Invalid item quantity");

  const newOrderItem = await createOrderItem(orderItem);
  res.status(200).send(newOrderItem);
});

// delete an order item
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("No id was provided");

  const orderItem = await getOrderItemById(id);
  if (!orderItem)
    return res.status(404).send("The requested order item does not exist");

  const deleted = await deleteOrderItem(id);
  if (deleted) return res.status(200).send(true);
});

export default router;
