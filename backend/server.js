import express from "express";

import itemRoutes from "./routes/itemRoutes.js";

import customerRoutes from "./routes/customerRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";

const app = express();
app.use(express.json());
const PORT = 8080;

// item routes
app.use("/items", itemRoutes);

// customer routes
app.use("/customers", customerRoutes);

// order routes
app.use("/orders", orderRoutes);
app.use("/orderItems", orderItemRoutes);

// err handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
