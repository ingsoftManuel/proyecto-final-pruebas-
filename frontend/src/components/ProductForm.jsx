import React, { useState, useEffect } from 'react';
import { getCategories, createProduct, updateProduct } from '../services/api';

function ProductForm({ onProductCreated, editingProduct, onCancelEdit }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description || '',
        price: editingProduct.price,
        stock: editingProduct.stock,
        category_id: editingProduct.category_id,
      });
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      if (response.data.length > 0 && !editingProduct) {
        setFormData((prev) => ({ ...prev, category_id: response.data[0].id }));
      }
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: categories[0]?.id || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setSuccess('Producto actualizado exitosamente');
      } else {
        await createProduct(productData);
        setSuccess('Producto creado exitosamente');
      }

      resetForm();
      if (onProductCreated) {
        onProductCreated();
      }
      if (onCancelEdit) {
        onCancelEdit();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar el producto');
    }
  };

  const handleCancel = () => {
    resetForm();
    setError('');
    setSuccess('');
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div style={styles.container}>
      <h2>{editingProduct ? 'Editar Producto' : 'Crear Producto'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
          data-testid="product-name-input"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          data-testid="product-description-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
          step="0.01"
          required
          data-testid="product-price-input"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          style={styles.input}
          required
          data-testid="product-stock-input"
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          style={styles.select}
          required
          data-testid="product-category-select"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button} data-testid="create-product-button">
            {editingProduct ? 'Actualizar' : 'Crear'} Producto
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={handleCancel}
              style={styles.cancelButton}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '80px',
    resize: 'vertical',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#757575',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    padding: '10px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
    marginTop: '10px',
  },
  success: {
    padding: '10px',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '4px',
    marginTop: '10px',
  },
};

export default ProductForm;