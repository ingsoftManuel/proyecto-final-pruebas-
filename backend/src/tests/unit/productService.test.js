const ProductService = require('../../services/productService');
const ProductModel = require('../../models/productModel');

// Mock del modelo
jest.mock('../../models/productModel');

describe('ProductService - Pruebas Unitarias', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    test('Debe retornar todos los productos', async () => {
      const mockProducts = [
        { id: 1, name: 'Laptop', price: 1000, stock: 5 },
        { id: 2, name: 'Mouse', price: 20, stock: 50 }
      ];
      ProductModel.getAll.mockResolvedValue(mockProducts);

      const result = await ProductService.getAllProducts();

      expect(result).toEqual(mockProducts);
      expect(ProductModel.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductById', () => {
    test('Debe retornar un producto por ID', async () => {
      const mockProduct = { id: 1, name: 'Laptop', price: 1000, stock: 5 };
      ProductModel.getById.mockResolvedValue(mockProduct);

      const result = await ProductService.getProductById(1);

      expect(result).toEqual(mockProduct);
      expect(ProductModel.getById).toHaveBeenCalledWith(1);
    });

    test('Debe lanzar error si el producto no existe', async () => {
      ProductModel.getById.mockResolvedValue(null);

      await expect(ProductService.getProductById(999))
        .rejects.toThrow('Producto no encontrado');
    });
  });

  describe('createProduct', () => {
    test('Debe crear un producto válido', async () => {
      const productData = {
        name: 'Laptop',
        description: 'Laptop gaming',
        price: 1000,
        stock: 5,
        category_id: 1
      };
      const mockProduct = { id: 1, ...productData };
      ProductModel.create.mockResolvedValue(mockProduct);

      const result = await ProductService.createProduct(productData);

      expect(result).toEqual(mockProduct);
      expect(ProductModel.create).toHaveBeenCalledWith(productData);
    });

    test('Debe lanzar error si el nombre está vacío', async () => {
      const productData = { name: '', price: 1000, stock: 5 };
      
      await expect(ProductService.createProduct(productData))
        .rejects.toThrow('El nombre del producto es requerido');
    });

    test('Debe lanzar error si el precio es negativo', async () => {
      const productData = { name: 'Laptop', price: -100, stock: 5 };
      
      await expect(ProductService.createProduct(productData))
        .rejects.toThrow('El precio debe ser un valor válido');
    });

    test('Debe lanzar error si el stock es negativo', async () => {
      const productData = { name: 'Laptop', price: 1000, stock: -5 };
      
      await expect(ProductService.createProduct(productData))
        .rejects.toThrow('El stock debe ser un valor válido');
    });
  });

  describe('updateProduct', () => {
    test('Debe actualizar un producto existente', async () => {
      const productData = {
        name: 'Laptop Actualizada',
        description: 'Nueva descripción',
        price: 1200,
        stock: 10,
        category_id: 1
      };
      const mockProduct = { id: 1, ...productData };
      ProductModel.update.mockResolvedValue(mockProduct);

      const result = await ProductService.updateProduct(1, productData);

      expect(result).toEqual(mockProduct);
      expect(ProductModel.update).toHaveBeenCalledWith(1, productData);
    });

    test('Debe lanzar error si el producto no existe', async () => {
      const productData = { name: 'Laptop', price: 1000, stock: 5 };
      ProductModel.update.mockResolvedValue(null);

      await expect(ProductService.updateProduct(999, productData))
        .rejects.toThrow('Producto no encontrado');
    });
  });

  describe('deleteProduct', () => {
    test('Debe eliminar un producto existente', async () => {
      const mockProduct = { id: 1, name: 'Laptop', price: 1000, stock: 5 };
      ProductModel.getById.mockResolvedValue(mockProduct);
      ProductModel.delete.mockResolvedValue({ message: 'Producto eliminado' });

      const result = await ProductService.deleteProduct(1);

      expect(result).toEqual({ message: 'Producto eliminado' });
      expect(ProductModel.delete).toHaveBeenCalledWith(1);
    });

    test('Debe lanzar error si el producto no existe', async () => {
      ProductModel.getById.mockResolvedValue(null);

      await expect(ProductService.deleteProduct(999))
        .rejects.toThrow('Producto no encontrado');
    });
  });
});