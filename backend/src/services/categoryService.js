const CategoryModel = require('../models/categoryModel');

class CategoryService {
  static async getAllCategories() {
    return await CategoryModel.getAll();
  }

  static async getCategoryById(id) {
    const category = await CategoryModel.getById(id);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }
    return category;
  }

  static async createCategory(name) {
    if (!name || name.trim() === '') {
      throw new Error('El nombre de la categoría es requerido');
    }
    return await CategoryModel.create(name.trim());
  }

  static async updateCategory(id, name) {
    if (!name || name.trim() === '') {
      throw new Error('El nombre de la categoría es requerido');
    }
    const category = await CategoryModel.update(id, name.trim());
    if (!category) {
      throw new Error('Categoría no encontrada');
    }
    return category;
  }

  static async deleteCategory(id) {
    await this.getCategoryById(id); // Verifica que existe
    return await CategoryModel.delete(id);
  }
}

module.exports = CategoryService;