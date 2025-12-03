describe('Sistema de Gestión de Inventario - E2E', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3001');
    cy.wait(2000);
  });

  it('Debe cargar la página principal correctamente', () => {
    cy.contains('Sistema de Gestión de Inventario').should('be.visible');
    cy.contains('Crear Categoría').should('be.visible');
    cy.contains('Crear Producto').should('be.visible');
    cy.contains('Lista de Productos').should('be.visible');
  });

  it('Flujo completo: Crear categoría, crear producto y visualizar en listado', () => {
    const timestamp = Date.now();
    const categoryName = `TestCategory${timestamp}`;
    const productName = `TestProduct${timestamp}`;

    // PASO 1: Crear una categoría
    cy.get('[data-testid="category-name-input"]').clear().type(categoryName);
    cy.get('[data-testid="create-category-button"]').click();
    cy.wait(2000);

    // PASO 2: Crear un producto con esa categoría
    cy.get('[data-testid="product-name-input"]').clear().type(productName);
    cy.get('[data-testid="product-description-input"]').clear().type('Producto de prueba E2E');
    cy.get('[data-testid="product-price-input"]').clear().type('999');
    cy.get('[data-testid="product-stock-input"]').clear().type('50');
    cy.get('[data-testid="product-category-select"]').select(categoryName);
    cy.get('[data-testid="create-product-button"]').click();
    
    // Esperar a que se actualice la tabla
    cy.wait(3000);

    // PASO 3: Verificar que el producto aparece en el listado
    cy.get('[data-testid="products-table"]', { timeout: 10000 }).should('be.visible');
    
    // Verificar que el producto está en la tabla
    cy.get('[data-testid="products-table"]').within(() => {
      cy.contains(productName).should('be.visible');
      cy.contains('$999.00').should('be.visible');
      cy.contains('50').should('be.visible');
    });
  });

  it('Debe crear múltiples categorías', () => {
    const timestamp = Date.now();
    const categories = [
      `Cat1_${timestamp}`,
      `Cat2_${timestamp}`,
      `Cat3_${timestamp}`
    ];

    categories.forEach((categoryName) => {
      cy.get('[data-testid="category-name-input"]').clear().type(categoryName);
      cy.get('[data-testid="create-category-button"]').click();
      cy.wait(1500);
    });

    // Verificar que todas las categorías están en la lista
    categories.forEach((categoryName) => {
      cy.contains(categoryName).should('be.visible');
    });
  });

  it('Debe mostrar la tabla de productos', () => {
    cy.get('[data-testid="products-table"]', { timeout: 10000 }).should('be.visible');
    // Verificar que la tabla tiene las columnas esperadas
    cy.contains('ID').should('be.visible');
    cy.contains('Nombre').should('be.visible');
    cy.contains('Precio').should('be.visible');
    cy.contains('Stock').should('be.visible');
  });
});