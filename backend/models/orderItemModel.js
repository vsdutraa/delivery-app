import pool from "../database.js";

// get all order items
export async function getOrderItems() {
  const [rows] = await pool.query(`SELECT * FROM order_items`);
  return rows;
}

// get order item by id
export async function getOrderItemById(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM order_items
    WHERE order_item_id = ?
    `,
    [id]
  );
  return rows[0];
}

// get (ORDER ITEM)s by (ORDER) id
export async function getOrderItemsByOrderId(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM order_items
    WHERE order_id = ?
    `,
    [id]
  );
  return rows;
}

// create new order item
export async function createOrderItem(orderItem) {
  const { orderId, itemId, itemQuantity } = orderItem;
  const [result] = await pool.query(
    `
        INSERT INTO order_items(order_id, item_id, item_quantity)
        VALUES (?, ?, ?)
        `,
    [orderId, itemId, itemQuantity]
  );
  const id = result.insertId;
  return getOrderItemById(id);
}

// delete order item
export async function deleteOrderItem(id) {
  const [result] = await pool.query(
    `
    DELETE FROM order_items
    WHERE order_item_id = ?
    `,
    [id]
  );

  return result.affectedRows > 0;
}
