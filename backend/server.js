import express from "express";

import dishRoutes from "./routes/dishRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();
app.use(express.json());
const PORT = 8080;

// dish routes
app.use("/dishes", dishRoutes);

// customer routes
app.use("/customers", customerRoutes);

// err handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
