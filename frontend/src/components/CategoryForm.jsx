import React, { useState, useEffect } from 'react';
import { getCategories, createCategory } from '../services/api';

function CategoryForm({ onCategoryCreated }) {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!categoryName.trim()) {
      setError('El nombre de la categoría es requerido');
      return;
    }

    try {
      await createCategory(categoryName);
      setSuccess('Categoría creada exitosamente');
      setCategoryName('');
      loadCategories();
      if (onCategoryCreated) {
        onCategoryCreated();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear la categoría');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Crear Categoría</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={styles.input}
          data-testid="category-name-input"
        />
        <button type="submit" style={styles.button} data-testid="create-category-button">
          Crear Categoría
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <div style={styles.categoriesList}>
        <h3>Categorías Existentes:</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id} data-testid={`category-${cat.id}`}>
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
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
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
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
  categoriesList: {
    marginTop: '20px',
  },
};

export default CategoryForm;