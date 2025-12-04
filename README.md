# Sistema de Gestión de Inventario

Sistema completo de gestión de inventario con API REST, interfaz web y suite completa de pruebas automatizadas.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Pruebas](#pruebas)
- [Base de Datos](#base-de-datos)
- [API Endpoints](#api-endpoints)
- [Pipeline CI/CD](#pipeline-cicd)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## Descripción

Sistema web para la gestión de inventario de productos que permite:
- Crear y gestionar categorías de productos
- Crear, listar, actualizar y eliminar productos
- Relacionar productos con categorías
- Validaciones de negocio
- Interfaz web intuitiva y responsive

---

## Arquitectura

El proyecto sigue una **arquitectura por capas**:

### Backend (API REST)
```
├── Models      → Acceso a datos (PostgreSQL)
├── Services    → Lógica de negocio
├── Controllers → Manejo de peticiones HTTP
└── Routes      → Definición de endpoints
```

### Frontend (React)
```
├── Components  → Componentes reutilizables
├── Pages       → Páginas principales
├── Services    → Comunicación con API
└── Tests       → Pruebas E2E
```

---

## Tecnologías

### Backend
- Node.js v18+
- Express v4 - Framework web
- PostgreSQL v15 - Base de datos
- pg - Cliente PostgreSQL
- dotenv - Variables de entorno
- cors - Manejo de CORS

### Frontend
- React v18 - Librería UI
- Axios - Cliente HTTP
- CSS3 - Estilos

### Testing
- Jest - Pruebas unitarias e integración
- Supertest - Pruebas de API
- Cypress - Pruebas E2E
- ESLint - Análisis estático

### CI/CD
- GitHub Actions - Pipeline de integración continua

---

## Requisitos Previos

- Node.js v18 o superior
- PostgreSQL v15 o superior
- npm v9 o superior
- Git

---

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/inventory-management-system.git
cd inventory-management-system
```

### 2. Instalar dependencias del Backend
```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend
```bash
cd ../frontend
npm install
```

---

## Configuración

### 1. Configurar Base de Datos

Crear la base de datos en PostgreSQL:
```sql
CREATE DATABASE inventory_db;
```

### 2. Configurar variables de entorno

Crear archivo `backend/.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_db
DB_USER=postgres
DB_PASSWORD=tu_password
```

### 3. Crear tablas

Las tablas se crean automáticamente al iniciar el servidor por primera vez.

---

## Ejecución

### Modo Desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
El backend estará disponible en: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
El frontend estará disponible en: `http://localhost:3001`

### Modo Producción

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Servir la carpeta build con un servidor web
```

---

## Pruebas

### Pruebas Unitarias (Backend)
```bash
cd backend
npm run test:unit
```

### Pruebas de Integración (Backend)
```bash
cd backend
npm run test:integration
```

### Todas las pruebas con cobertura
```bash
cd backend
npm test
```

### Análisis Estático (ESLint)
```bash
cd backend
npm run lint
```

### Pruebas E2E (Cypress)

Las pruebas End-to-End con Cypress están disponibles para ejecución local:

**Modo Interactivo:**
```bash
cd frontend
npm run test:e2e:open
```

**Modo Headless:**
```bash
cd frontend
npm run test:e2e
```

---

## Base de Datos

### Esquema

#### Tabla: categories
| Campo      | Tipo         | Descripción              |
|------------|--------------|--------------------------|
| id         | SERIAL       | Primary Key              |
| name       | VARCHAR(100) | Nombre único             |
| created_at | TIMESTAMP    | Fecha de creación        |

#### Tabla: products
| Campo       | Tipo          | Descripción              |
|-------------|---------------|--------------------------|
| id          | SERIAL        | Primary Key              |
| name        | VARCHAR(200)  | Nombre del producto      |
| description | TEXT          | Descripción              |
| price       | DECIMAL(10,2) | Precio                   |
| stock       | INTEGER       | Cantidad en inventario   |
| category_id | INTEGER       | Foreign Key a categories |
| created_at  | TIMESTAMP     | Fecha de creación        |

### Relaciones
- Un producto pertenece a una categoría (N:1)
- Una categoría puede tener múltiples productos (1:N)

---

## API Endpoints

### Categorías

| Método | Endpoint              | Descripción              |
|--------|-----------------------|--------------------------|
| GET    | /api/categories       | Listar todas             |
| GET    | /api/categories/:id   | Obtener por ID           |
| POST   | /api/categories       | Crear nueva              |
| PUT    | /api/categories/:id   | Actualizar               |
| DELETE | /api/categories/:id   | Eliminar                 |

### Productos

| Método | Endpoint           | Descripción              |
|--------|--------------------| -------------------------|
| GET    | /api/products      | Listar todos             |
| GET    | /api/products/:id  | Obtener por ID           |
| POST   | /api/products      | Crear nuevo              |
| PUT    | /api/products/:id  | Actualizar               |
| DELETE | /api/products/:id  | Eliminar                 |

### Health Check

| Método | Endpoint      | Descripción              |
|--------|---------------|--------------------------|
| GET    | /api/health   | Estado de la API         |

### Ejemplo de uso

**Crear Categoría:**
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Electrónica"}'
```

**Crear Producto:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop HP",
    "description": "Laptop gaming",
    "price": 1500,
    "stock": 10,
    "category_id": 1
  }'
```

---

## Pipeline CI/CD

El proyecto incluye un pipeline de GitHub Actions que ejecuta:

1. Instalación de dependencias (Backend y Frontend)
2. Análisis estático (ESLint)
3. Pruebas unitarias (Jest)
4. Pruebas de integración (Jest + Supertest)
5. Pruebas E2E (Cypress)
6. Imprime "OK" si todo pasa correctamente

### Estado del Pipeline

El pipeline se ejecuta automáticamente en cada:
- Push a `main` o `master`
- Pull Request a `main` o `master`

---

## Estructura del Proyecto
```
inventory-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── categoryController.js
│   │   │   └── productController.js
│   │   ├── models/
│   │   │   ├── categoryModel.js
│   │   │   └── productModel.js
│   │   ├── routes/
│   │   │   ├── categoryRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── services/
│   │   │   ├── categoryService.js
│   │   │   └── productService.js
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── eslint.config.js
│   └── package.json
├── frontend/
│   ├── cypress/
│   │   └── e2e/
│   │       └── inventory.cy.js
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryForm.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductList.jsx
│   │   ├── pages/
│   │   │   └── HomePage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── cypress.config.js
│   └── package.json
├── docs/
│   └── PLAN_DE_PRUEBAS.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
└── README.md
```

## Demo en Vivo

- **Frontend:** https://inventory-frontend-xxxx.onrender.com
- **API Backend:** https://inventory-api-r12h.onrender.com
- **API Health:** https://inventory-api-r12h.onrender.com/api/health

El proyecto está completamente desplegado en Render con:
- Frontend: Static Site
- Backend: Web Service (Node.js + Express)
- Base de Datos: PostgreSQL

---

## Cobertura de Pruebas

- Pruebas Unitarias: 15 casos
- Pruebas de Integración: 12 casos
- Pruebas E2E: 5 casos
- Cobertura de Código: >80%

---

## Autor

Juan Manuel Rodriguez Pinzon
Proyecto Final - Asignatura Pruebas de Software
Ingeniería de Software
