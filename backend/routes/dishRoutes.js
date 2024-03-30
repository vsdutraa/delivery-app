import express from "express";
const router = express.Router();

import {
  getDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} from "../models/dishModel.js";

router.use(express.json());

// get all dishes
router.get("/", async (req, res) => {
  const dishes = await getDishes();
  res.status(200).send(dishes);
});

// get dish by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(404).send("No id was provided");
  const dish = await getDishById(id);
  if (!dish) return res.status(404).send("The requested dish does not exist");
  res.status(200).send(dish);
});

// create new dish
router.post("/", async (req, res) => {
  const dish = req.body;
  const { name, description, value } = dish;
  if (!name || !description || !value)
    return res.status(400).send("All fields are required");
  const newDish = await createDish(dish);
  res.status(201).send(newDish);
});

// update dish by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(404).send("No id was provided");
  const dish = req.body;
  const { name, description, value } = dish;
  if (!name || !description || !value)
    return res.status(400).send("All fields are required");
  const updated = updateDish(id, dish);
  if (updated) return res.status(200).send(true);
});

// delete dish by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(404).send("No id was provided");
  const dish = await getDishById(id);
  if (!dish) return res.status(404).send("The requested dish does not exist");
  const deleted = await deleteDish(id);
  if (deleted) return res.status(200).send(true);
});

export default router;
