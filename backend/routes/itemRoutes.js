import express from "express";
const router = express.Router();

import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../models/itemModel.js";

router.use(express.json());

// get all items
router.get("/", async (req, res) => {
  const items = await getItems();
  res.status(200).send(items);
});

// get item by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("No id was provided");
  const item = await getItemById(id);
  if (!item) return res.status(404).send("The requested item does not exist");
  res.status(200).send(item);
});

// create new item
router.post("/", async (req, res) => {
  const item = req.body;
  const { name, description, value } = item;
  if (!name || !description || !value)
    return res.status(400).send("All fields are required");
  const newItem = await createItem(item);
  res.status(201).send(newItem);
});

// update item by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("No id was provided");
  const item = req.body;
  const { name, description, value } = item;
  if (!name || !description || !value)
    return res.status(400).send("All fields are required");
  const updated = updateItem(id, item);
  if (updated) return res.status(200).send(true);
});

// delete item by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("No id was provided");
  const item = await getItemById(id);
  if (!item) return res.status(404).send("The requested item does not exist");
  const deleted = await deleteItem(id);
  if (deleted) return res.status(200).send(true);
});

export default router;
