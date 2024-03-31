import express from "express";
const router = express.Router();

import {
  getCustomers,
  getCustomerById,
  createCustomer,
  getCustomerByCpf,
  updateCustomer,
  deleteCustomer,
} from "../models/customerModel.js";

router.use(express.json());

// get all customers
router.get("/", async (req, res) => {
  const customers = await getCustomers();
  res.status(200).send(customers);
});

// get customer by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("No id was provided");
  const customer = await getCustomerById(id);
  res.status(200).send(customer);
});

// get customer by cpf
router.get("/search/:cpf", async (req, res) => {
  const cpf = req.params.cpf;
  const customer = await getCustomerByCpf(cpf);
  res.status(200).send(customer);
});

// create a customer
router.post("/", async (req, res) => {
  const customer = req.body;
  const { customerName, customerCpf, customerPhoneNumber, customerAddress } =
    customer;

  const newCustomer = await createCustomer(customer);
  res.status(201).send(newCustomer);
});

// update an existing customer by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.send("No id was provided");

  const customer = req.body;
  const { customerPhoneNumber, customerAddress } = customer;

  if (!customerPhoneNumber || !customerAddress)
    return res.status(400).send("All fields are required");

  const updated = await updateCustomer(id, customer);
  if (updated) return res.status(200).send(true);
});

// delete an existing customer by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(404).send("No id was provided");

  const dish = await getCustomerById(id);
  if (!dish)
    return res.status(404).send("The requested customer does not exist");

  const deleted = await deleteCustomer(id);
  if (deleted) return res.status(200).send(true);
});

export default router;
