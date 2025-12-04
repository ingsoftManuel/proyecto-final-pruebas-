import React, { useState } from 'react';
import CategoryForm from '../components/CategoryForm';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCategoryCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleProductCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    // Scroll suave hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Gestión de Inventario</h1>
      
      <div style={styles.formsContainer}>
        <CategoryForm onCategoryCreated={handleCategoryCreated} />
        <ProductForm 
          key={`${refreshKey}-${editingProduct?.id || 'new'}`}
          onProductCreated={handleProductCreated}
          editingProduct={editingProduct}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <ProductList 
        key={`products-${refreshKey}`}
        onEditProduct={handleEditProduct}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  formsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '30px',
  },
};

export default HomePage;