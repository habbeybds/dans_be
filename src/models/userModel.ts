import pool from '../utils/dbConfig';

interface User {
  id: number;
  username: string;
  password: string;
}

export const findUserByUsername = async (username: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query("SELECT * FROM users WHERE username = ?", [username], (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  });
};

export const createUser = async (username: string, hashedPassword: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (error, results) => {
          connection.release();
          if (error) {
            reject(error);
          } else {
            resolve({
              id: results.insertId,
              username,
              password: hashedPassword,
            });
          }
        }
      );
    });
  });
};
