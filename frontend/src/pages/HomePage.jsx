import React, { useState } from 'react';
import CategoryForm from '../components/CategoryForm';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategoryCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleProductCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Gestión de Inventario</h1>
      
      <div style={styles.formsContainer}>
        <CategoryForm onCategoryCreated={handleCategoryCreated} />
        <ProductForm key={refreshKey} onProductCreated={handleProductCreated} />
      </div>

      <ProductList key={`products-${refreshKey}`} />
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