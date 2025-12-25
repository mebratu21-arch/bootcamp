const pool = require('../config/db');

const createUser = async (user, hashedPassword) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertUserQuery = `
      INSERT INTO users (email, username, first_name, last_name)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const userRes = await client.query(insertUserQuery, [
      user.email,
      user.username,
      user.first_name,
      user.last_name
    ]);

    const insertPwdQuery = `
      INSERT INTO hashpwd (username, password)
      VALUES ($1, $2) RETURNING *`;
    await client.query(insertPwdQuery, [user.username, hashedPassword]);

    await client.query('COMMIT');
    return userRes.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const getAllUsers = async () => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

const getUserById = async (id) => {
  const res = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
  return res.rows[0];
};

const getUserByUsername = async (username) => {
  const res = await pool.query('SELECT * FROM hashpwd WHERE username=$1', [username]);
  return res.rows[0];
};

const updateUser = async (id, data) => {
  const query = `
    UPDATE users 
    SET email=$1, username=$2, first_name=$3, last_name=$4
    WHERE id=$5 RETURNING *`;
  const values = [data.email, data.username, data.first_name, data.last_name, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

module.exports = { createUser, getAllUsers, getUserById, getUserByUsername, updateUser };
