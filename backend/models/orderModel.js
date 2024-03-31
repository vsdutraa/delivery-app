import pool from "../database.js";

export async function getOrders() {
  const [rows] = await pool.query(`SELECT * FROM orders`);
  return rows;
}

export async function getOrderById(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM orders
    WHERE order_id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function getOrdersByStatus(status) {
  const [rows] = await pool.query(
    `
    SELECT * FROM orders
    WHERE order_status = ?
    `,
    [status]
  );
  return rows;
}

export async function createOrder(order) {
  const { customerId } = order;
  const [result] = await pool.query(
    `
    INSERT INTO orders (customer_id)
    VALUES (?)
    `,
    [customerId]
  );
  const id = result.insertId;
  return getOrderById(id);
}

export async function updateOrderStatus(id, status) {
  const [result] = await pool.query(
    `
    UPDATE orders 
    SET order_status = ?
    WHERE order_id = ?
    `,
    [status, id]
  );
  // returns a boolean indicating whether it was updated or not
  return result.affectedRows > 0;
}

export async function deleteOrder(id) {
  const [result] = await pool.query(
    `
    DELETE FROM orders
    WHERE order_id = ?
    `,
    [id]
  );
  // returns a boolean indicating whether it was deleted or not
  return result.affectedRows > 0;
}
