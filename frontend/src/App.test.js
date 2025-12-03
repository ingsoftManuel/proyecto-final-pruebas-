import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock completo del módulo de servicios
jest.mock('./services/api', () => ({
  getCategories: jest.fn(() => Promise.resolve({ data: [] })),
  getProducts: jest.fn(() => Promise.resolve({ data: [] })),
  createCategory: jest.fn(() => Promise.resolve({ data: { id: 1, name: 'Test' } })),
  createProduct: jest.fn(() => Promise.resolve({ data: { id: 1, name: 'Test Product' } })),
  deleteProduct: jest.fn(() => Promise.resolve()),
}));

describe('App Component', () => {
  test('renders sistema de gestion title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Sistema de Gestión de Inventario/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders crear categoria heading', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading', { name: /Crear Categoría/i });
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders crear producto heading', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading', { name: /Crear Producto/i });
    expect(headings.length).toBeGreaterThan(0);
  });

  test('renders category input field', () => {
    render(<App />);
    const input = screen.getByTestId('category-name-input');
    expect(input).toBeInTheDocument();
  });

  test('renders product form fields', () => {
    render(<App />);
    const productNameInput = screen.getByTestId('product-name-input');
    const productPriceInput = screen.getByTestId('product-price-input');
    const productStockInput = screen.getByTestId('product-stock-input');
    
    expect(productNameInput).toBeInTheDocument();
    expect(productPriceInput).toBeInTheDocument();
    expect(productStockInput).toBeInTheDocument();
  });
});