import pool from "../database.js";

// get all items
export async function getItems() {
  const [rows] = await pool.query("SELECT * FROM items");
  return rows;
}

// get single item by id
export async function getItemById(id) {
  const [rows] = await pool.query(
    `
      SELECT *
      FROM items
      WHERE item_id = ?
      `,
    [id]
  );

  return rows[0];
}

// create a new item
export async function createItem(item) {
  const { name, description, value } = item;
  const [result] = await pool.query(
    `
      INSERT INTO items (item_name, item_description, item_value)
      VALUES (?, ?, ?)
      `,
    [name, description, value]
  );
  const id = result.insertId;
  return getItemById(id);
}

// update a existing item by id
export async function updateItem(id, item) {
  const { name, description, value } = item;
  const [result] = await pool.query(
    `
      UPDATE items
      SET item_name = ?, item_description = ?, item_value = ?
      WHERE item_id = ?
      `,
    [name, description, value, id]
  );
  // returns a boolean indicating whether it was updated or not
  return result.affectedRows > 0;
}

// delete item by id
export async function deleteItem(id) {
  const [result] = await pool.query(
    `
      DELETE FROM items
      WHERE item_id = ?
      `,
    [id]
  );
  // returns a boolean indicating whether it was deleted or not
  return result.affectedRows > 0;
}
