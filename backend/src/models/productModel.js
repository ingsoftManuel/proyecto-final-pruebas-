const { pool } = require('../config/database');

class ProductModel {
  static async getAll() {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.id
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(productData) {
    const { name, description, price, stock, category_id } = productData;
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, stock, category_id]
    );
    return result.rows[0];
  }

  static async update(id, productData) {
    const { name, description, price, stock, category_id } = productData;
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category_id = $5 WHERE id = $6 RETURNING *',
      [name, description, price, stock, category_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return { message: 'Producto eliminado' };
  }
}

module.exports = ProductModel;