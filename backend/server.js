import express from "express";
import {
  getDishes,
  getDish,
  createDish,
  updateDish,
  deleteDish,
} from "./database.js";

const app = express();
app.use(express.json());
const PORT = 8080;

// get all dishes
app.get("/dishes", async (req, res) => {
  const dishes = await getDishes();
  res.status(200).send(dishes);
});

// get dish by id
app.get("/dishes/:id", async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(404).send("No id was provided");
  const dish = await getDish(id);
  if (!dish) return res.status(404).send("The requested dish does not exist");
  res.status(200).send(dish);
});

// create new dish
app.post("/dishes", async (req, res) => {
  const dish = req.body;
  const { name, description, value } = dish;
  if (!name || !description || !value)
    return res.status(400).send("All fields are required");
  const newDish = await createDish(dish);
  res.status(201).send(newDish);
});

// update dish by id
app.put("/dishes/:id", async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(404).send("No id was provided");
  const dish = req.body;
  const { name, description, value } = dish;
  if (!name || !description || !value)
    return res.status(400).send("All fields are required");
  if (await updateDish(id, dish)) return res.status(200).send(true);
});

// delete dish by id
app.delete("/dishes/:id", async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(404).send("No id was provided");
  const dish = await getDish(id);
  if (!dish) return res.status(404).send("The requested dish does not exist");
  if (await deleteDish(id)) return res.status(200).send(true);
});

// err handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
