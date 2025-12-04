import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/api';

function ProductList({ onEditProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (err) {
        setError('Error al eliminar el producto');
        console.error(err);
      }
    }
  };

  const handleEdit = (product) => {
    if (onEditProduct) {
      onEditProduct(product);
    }
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        <table style={styles.table} data-testid="products-table">
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Descripción</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Categoría</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} data-testid={`product-row-${product.id}`}>
                <td style={styles.td}>{product.id}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.description}</td>
                <td style={styles.td}>${parseFloat(product.price).toFixed(2)}</td>
                <td style={styles.td}>{product.stock}</td>
                <td style={styles.td}>{product.category_name || 'Sin categoría'}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={styles.editButton}
                    data-testid={`edit-product-${product.id}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={styles.deleteButton}
                    data-testid={`delete-product-${product.id}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
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
  },
};

export default ProductList;