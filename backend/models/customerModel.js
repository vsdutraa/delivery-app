import pool from "../database.js";

// get all customers
export async function getCustomers() {
  const [rows] = await pool.query("SELECT * FROM customers");
  return rows;
}

// get customer by id
export async function getCustomerById(id) {
  const [rows] = await pool.query(
    `
      SELECT * FROM customers
      WHERE customer_id = ?
      `,
    [id]
  );

  return rows[0];
}

// get customer by cpf
export async function getCustomerByCpf(cpf) {
  const [rows] = await pool.query(
    `
      SELECT * FROM customers
      WHERE customer_cpf = ?
      `,
    [cpf]
  );
  return rows[0];
}

// create a new customer
export async function createCustomer(customer) {
  const { name, cpf, phoneNumber, address } = customer;
  const [result] = await pool.query(
    `
    INSERT INTO customers(customer_name, customer_cpf, customer_phone_number, customer_address)
    VALUES (?, ?, ?, ?)
    `,
    [name, cpf, phoneNumber, address]
  );
  const id = result.insertId;
  return getCustomerById(id);
}

// update an existing customer
export async function updateCustomer(id, customer) {
  const { name, phoneNumber, address } = customer;
  const [result] = await pool.query(
    `
    UPDATE customers
    SET customer_phone_number = ?, customer_address = ?
    WHERE customer_id = ?
    `,
    [phoneNumber, address, id]
  );
  // returns a boolean indicating whether it was updated or not
  return result.affectedRows > 0;
}

export async function deleteCustomer(id) {
  const [result] = await pool.query(
    `
    DELETE FROM customers
    WHERE customer_id = ?
    `,
    [id]
  );
  // returns a boolean indicating whether it was deleted or not
  return result.affectedRows > 0;
}
