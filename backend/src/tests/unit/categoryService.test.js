const CategoryService = require('../../services/categoryService');
const CategoryModel = require('../../models/categoryModel');

// Mock del modelo
jest.mock('../../models/categoryModel');

describe('CategoryService - Pruebas Unitarias', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    test('Debe retornar todas las categorías', async () => {
      const mockCategories = [
        { id: 1, name: 'Electrónica' },
        { id: 2, name: 'Ropa' }
      ];
      CategoryModel.getAll.mockResolvedValue(mockCategories);

      const result = await CategoryService.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(CategoryModel.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoryById', () => {
    test('Debe retornar una categoría por ID', async () => {
      const mockCategory = { id: 1, name: 'Electrónica' };
      CategoryModel.getById.mockResolvedValue(mockCategory);

      const result = await CategoryService.getCategoryById(1);

      expect(result).toEqual(mockCategory);
      expect(CategoryModel.getById).toHaveBeenCalledWith(1);
    });

    test('Debe lanzar error si la categoría no existe', async () => {
      CategoryModel.getById.mockResolvedValue(null);

      await expect(CategoryService.getCategoryById(999))
        .rejects.toThrow('Categoría no encontrada');
    });
  });

  describe('createCategory', () => {
    test('Debe crear una categoría válida', async () => {
      const mockCategory = { id: 1, name: 'Electrónica' };
      CategoryModel.create.mockResolvedValue(mockCategory);

      const result = await CategoryService.createCategory('Electrónica');

      expect(result).toEqual(mockCategory);
      expect(CategoryModel.create).toHaveBeenCalledWith('Electrónica');
    });

    test('Debe lanzar error si el nombre está vacío', async () => {
      await expect(CategoryService.createCategory(''))
        .rejects.toThrow('El nombre de la categoría es requerido');
    });

    test('Debe lanzar error si el nombre es null', async () => {
      await expect(CategoryService.createCategory(null))
        .rejects.toThrow('El nombre de la categoría es requerido');
    });
  });

  describe('updateCategory', () => {
    test('Debe actualizar una categoría existente', async () => {
      const mockCategory = { id: 1, name: 'Electrónica Actualizada' };
      CategoryModel.update.mockResolvedValue(mockCategory);

      const result = await CategoryService.updateCategory(1, 'Electrónica Actualizada');

      expect(result).toEqual(mockCategory);
      expect(CategoryModel.update).toHaveBeenCalledWith(1, 'Electrónica Actualizada');
    });

    test('Debe lanzar error si el nombre está vacío', async () => {
      await expect(CategoryService.updateCategory(1, ''))
        .rejects.toThrow('El nombre de la categoría es requerido');
    });
  });

  describe('deleteCategory', () => {
    test('Debe eliminar una categoría existente', async () => {
      const mockCategory = { id: 1, name: 'Electrónica' };
      CategoryModel.getById.mockResolvedValue(mockCategory);
      CategoryModel.delete.mockResolvedValue({ message: 'Categoría eliminada' });

      const result = await CategoryService.deleteCategory(1);

      expect(result).toEqual({ message: 'Categoría eliminada' });
      expect(CategoryModel.delete).toHaveBeenCalledWith(1);
    });

    test('Debe lanzar error si la categoría no existe', async () => {
      CategoryModel.getById.mockResolvedValue(null);

      await expect(CategoryService.deleteCategory(999))
        .rejects.toThrow('Categoría no encontrada');
    });
  });
});