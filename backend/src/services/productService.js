const ProductModel = require('../models/productModel');

class ProductService {
  static async getAllProducts() {
    return await ProductModel.getAll();
  }

  static async getProductById(id) {
    const product = await ProductModel.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  static async createProduct(productData) {
    const { name, price, stock } = productData;
    
    if (!name || name.trim() === '') {
      throw new Error('El nombre del producto es requerido');
    }
    if (price === undefined || price < 0) {
      throw new Error('El precio debe ser un valor válido');
    }
    if (stock === undefined || stock < 0) {
      throw new Error('El stock debe ser un valor válido');
    }

    return await ProductModel.create(productData);
  }

  static async updateProduct(id, productData) {
    const { name, price, stock } = productData;
    
    if (!name || name.trim() === '') {
      throw new Error('El nombre del producto es requerido');
    }
    if (price === undefined || price < 0) {
      throw new Error('El precio debe ser un valor válido');
    }
    if (stock === undefined || stock < 0) {
      throw new Error('El stock debe ser un valor válido');
    }

    const product = await ProductModel.update(id, productData);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  static async deleteProduct(id) {
    await this.getProductById(id); // Verifica que existe
    return await ProductModel.delete(id);
  }
}

module.exports = ProductService;