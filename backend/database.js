import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// get all dishes
export async function getDishes() {
  const [rows] = await pool.query("SELECT * FROM dishes");
  return rows;
}

// get single dish by id
export async function getDish(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM dishes
    WHERE dish_id = ?
    `,
    [id]
  );

  return rows[0];
}

// create a new dish
export async function createDish(dish) {
  const { name, description, value } = dish;
  const [result] = await pool.query(
    `
    INSERT INTO dishes (dish_name, dish_description, dish_value)
    VALUES (?, ?, ?)
    `,
    [name, description, value]
  );
  const id = result.insertId;
  return getDish(id);
}

// update a existing dish by id
export async function updateDish(id, dish) {
  const { name, description, value } = dish;
  const [result] = await pool.query(
    `
    UPDATE dishes
    SET dish_name = ?, dish_description = ?, dish_value = ?
    WHERE dish_id = ?
    `,
    [name, description, value, id]
  );
  // returns a boolean indicating whether it was updated or not
  return result.affectedRows > 0;
}

export async function deleteDish(id) {
  const [result] = await pool.query(
    `
    DELETE FROM dishes
    WHERE dish_id = ?
    `,
    [id]
  );
  // returns a boolean indicating whether it was deleted or not
  return result.affectedRows > 0;
}
