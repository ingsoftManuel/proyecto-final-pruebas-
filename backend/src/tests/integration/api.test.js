const request = require('supertest');
const app = require('../../app');
const { pool } = require('../../config/database');

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Crear tablas de prueba
    await pool.query('DROP TABLE IF EXISTS products CASCADE');
    await pool.query('DROP TABLE IF EXISTS categories CASCADE');
    
    await pool.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    // Limpiar datos antes de cada prueba
    await pool.query('DELETE FROM products');
    await pool.query('DELETE FROM categories');
  });

  describe('GET /api/health', () => {
    test('Debe retornar estado OK', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
    });
  });

  describe('Categories API', () => {
    test('POST /api/categories - Debe crear una categoría', async () => {
      const response = await request(app)
        .post('/api/categories')
        .send({ name: 'Electrónica' });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Electrónica');
      expect(response.body.id).toBeDefined();
    });

    test('GET /api/categories - Debe listar todas las categorías', async () => {
      // Crear categorías
      await request(app).post('/api/categories').send({ name: 'Electrónica' });
      await request(app).post('/api/categories').send({ name: 'Ropa' });

      const response = await request(app).get('/api/categories');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    test('GET /api/categories/:id - Debe obtener una categoría por ID', async () => {
      const createResponse = await request(app)
        .post('/api/categories')
        .send({ name: 'Electrónica' });

      const response = await request(app)
        .get(`/api/categories/${createResponse.body.id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Electrónica');
    });

    test('PUT /api/categories/:id - Debe actualizar una categoría', async () => {
      const createResponse = await request(app)
        .post('/api/categories')
        .send({ name: 'Electrónica' });

      const response = await request(app)
        .put(`/api/categories/${createResponse.body.id}`)
        .send({ name: 'Tecnología' });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Tecnología');
    });

    test('DELETE /api/categories/:id - Debe eliminar una categoría', async () => {
      const createResponse = await request(app)
        .post('/api/categories')
        .send({ name: 'Electrónica' });

      const response = await request(app)
        .delete(`/api/categories/${createResponse.body.id}`);

      expect(response.status).toBe(204);
    });
  });

  describe('Products API', () => {
    let categoryId;

    beforeEach(async () => {
      const categoryResponse = await request(app)
        .post('/api/categories')
        .send({ name: 'Electrónica' });
      categoryId = categoryResponse.body.id;
    });

    test('POST /api/products - Debe crear un producto', async () => {
      const productData = {
        name: 'Laptop HP',
        description: 'Laptop gaming de alta gama',
        price: 1500,
        stock: 10,
        category_id: categoryId
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Laptop HP');
      expect(response.body.price).toBe('1500.00');
    });

    test('GET /api/products - Debe listar todos los productos', async () => {
      await request(app).post('/api/products').send({
        name: 'Laptop',
        description: 'Laptop gaming',
        price: 1500,
        stock: 10,
        category_id: categoryId
      });

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /api/products/:id - Debe obtener un producto por ID', async () => {
      const createResponse = await request(app).post('/api/products').send({
        name: 'Laptop',
        description: 'Laptop gaming',
        price: 1500,
        stock: 10,
        category_id: categoryId
      });

      const response = await request(app)
        .get(`/api/products/${createResponse.body.id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Laptop');
    });

    test('PUT /api/products/:id - Debe actualizar un producto', async () => {
      const createResponse = await request(app).post('/api/products').send({
        name: 'Laptop',
        description: 'Laptop gaming',
        price: 1500,
        stock: 10,
        category_id: categoryId
      });

      const response = await request(app)
        .put(`/api/products/${createResponse.body.id}`)
        .send({
          name: 'Laptop Actualizada',
          description: 'Nueva descripción',
          price: 1800,
          stock: 5,
          category_id: categoryId
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Laptop Actualizada');
      expect(response.body.price).toBe('1800.00');
    });

    test('DELETE /api/products/:id - Debe eliminar un producto', async () => {
      const createResponse = await request(app).post('/api/products').send({
        name: 'Laptop',
        description: 'Laptop gaming',
        price: 1500,
        stock: 10,
        category_id: categoryId
      });

      const response = await request(app)
        .delete(`/api/products/${createResponse.body.id}`);

      expect(response.status).toBe(204);
    });
  });
});