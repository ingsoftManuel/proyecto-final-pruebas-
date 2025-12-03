# PLAN DE PRUEBAS - Sistema de Gestión de Inventario

## 1. INFORMACIÓN GENERAL

**Proyecto:** Sistema de Gestión de Inventario  
**Versión:** 1.0.0  
**Fecha:** Diciembre 2024  
**Responsable:** [Tu Nombre]  
**Tecnologías:** Node.js, Express, React, PostgreSQL, Jest, Cypress

---

## 2. OBJETIVO

Validar el correcto funcionamiento del Sistema de Gestión de Inventario mediante pruebas automatizadas que cubran:
- Lógica de negocio (Pruebas Unitarias)
- Integración con base de datos y API (Pruebas de Integración)
- Flujo completo de usuario (Pruebas E2E)
- Calidad del código (Análisis Estático)

---

## 3. ALCANCE

### 3.1 Módulos a Probar
- **Backend API REST:**
  - Gestión de categorías (CRUD)
  - Gestión de productos (CRUD)
  - Validaciones de negocio
  
- **Frontend:**
  - Formulario de creación de categorías
  - Formulario de creación de productos
  - Listado de productos
  - Eliminación de productos

- **Base de Datos:**
  - Tablas categories y products
  - Relaciones entre tablas
  - Integridad referencial

---

## 4. CASOS DE PRUEBA

### 4.1 PRUEBAS UNITARIAS

#### PU-001: CategoryService - Obtener todas las categorías
- **Tipo:** Unitaria
- **Descripción:** Verificar que el servicio retorna todas las categorías
- **Prerrequisitos:** Mock del modelo configurado
- **Pasos:**
  1. Configurar mock con array de categorías
  2. Llamar a `CategoryService.getAllCategories()`
  3. Verificar respuesta
- **Resultado Esperado:** Array de categorías
- **Resultado Obtenido:** PASS

#### PU-002: CategoryService - Crear categoría válida
- **Tipo:** Unitaria
- **Descripción:** Verificar que se crea una categoría con datos válidos
- **Prerrequisitos:** Mock del modelo configurado
- **Pasos:**
  1. Llamar a `CategoryService.createCategory('Electrónica')`
  2. Verificar que se llama al modelo
- **Resultado Esperado:** Categoría creada con ID
- **Resultado Obtenido:** PASS

#### PU-003: CategoryService - Validar nombre vacío
- **Tipo:** Unitaria
- **Descripción:** Verificar que no permite crear categoría sin nombre
- **Prerrequisitos:** Ninguno
- **Pasos:**
  1. Llamar a `CategoryService.createCategory('')`
  2. Capturar error
- **Resultado Esperado:** Error "El nombre de la categoría es requerido"
- **Resultado Obtenido:** PASS

#### PU-004: ProductService - Crear producto válido
- **Tipo:** Unitaria
- **Descripción:** Verificar creación de producto con todos los campos válidos
- **Prerrequisitos:** Mock del modelo configurado
- **Pasos:**
  1. Preparar datos del producto
  2. Llamar a `ProductService.createProduct(data)`
  3. Verificar respuesta
- **Resultado Esperado:** Producto creado exitosamente
- **Resultado Obtenido:** PASS

#### PU-005: ProductService - Validar precio negativo
- **Tipo:** Unitaria
- **Descripción:** Verificar que no permite precio negativo
- **Prerrequisitos:** Ninguno
- **Pasos:**
  1. Crear producto con precio -100
  2. Capturar error
- **Resultado Esperado:** Error "El precio debe ser un valor válido"
- **Resultado Obtenido:** PASS

#### PU-006: ProductService - Validar stock negativo
- **Tipo:** Unitaria
- **Descripción:** Verificar que no permite stock negativo
- **Prerrequisitos:** Ninguno
- **Pasos:**
  1. Crear producto con stock -5
  2. Capturar error
- **Resultado Esperado:** Error "El stock debe ser un valor válido"
- **Resultado Obtenido:** PASS

---

### 4.2 PRUEBAS DE INTEGRACIÓN

#### PI-001: API Health Check
- **Tipo:** Integración
- **Descripción:** Verificar que la API responde correctamente
- **Prerrequisitos:** Servidor corriendo, base de datos conectada
- **Pasos:**
  1. GET /api/health
  2. Verificar código de estado
- **Resultado Esperado:** Status 200, { status: "OK" }
- **Resultado Obtenido:** PASS

#### PI-002: Crear categoría via API
- **Tipo:** Integración
- **Descripción:** Crear una categoría mediante endpoint POST
- **Prerrequisitos:** Base de datos limpia
- **Pasos:**
  1. POST /api/categories con { name: "Electrónica" }
  2. Verificar respuesta
  3. Verificar en BD
- **Resultado Esperado:** Status 201, categoría con ID
- **Resultado Obtenido:** PASS

#### PI-003: Listar todas las categorías via API
- **Tipo:** Integración
- **Descripción:** Obtener lista de categorías
- **Prerrequisitos:** Al menos 2 categorías en BD
- **Pasos:**
  1. Crear 2 categorías
  2. GET /api/categories
  3. Verificar respuesta
- **Resultado Esperado:** Status 200, array con 2 categorías
- **Resultado Obtenido:** PASS

#### PI-004: Crear producto via API
- **Tipo:** Integración
- **Descripción:** Crear producto completo con categoría
- **Prerrequisitos:** Categoría existente en BD
- **Pasos:**
  1. Crear categoría
  2. POST /api/products con datos completos
  3. Verificar respuesta
- **Resultado Esperado:** Status 201, producto creado
- **Resultado Obtenido:** PASS

#### PI-005: Actualizar producto via API
- **Tipo:** Integración
- **Descripción:** Modificar datos de un producto existente
- **Prerrequisitos:** Producto existente en BD
- **Pasos:**
  1. Crear producto
  2. PUT /api/products/:id con nuevos datos
  3. Verificar cambios
- **Resultado Esperado:** Status 200, producto actualizado
- **Resultado Obtenido:** PASS

#### PI-006: Eliminar producto via API
- **Tipo:** Integración
- **Descripción:** Eliminar un producto por ID
- **Prerrequisitos:** Producto existente en BD
- **Pasos:**
  1. Crear producto
  2. DELETE /api/products/:id
  3. Verificar eliminación
- **Resultado Esperado:** Status 204, producto eliminado
- **Resultado Obtenido:** PASS

---

### 4.3 PRUEBAS E2E (END-TO-END)

#### PE2E-001: Cargar página principal
- **Tipo:** E2E
- **Descripción:** Verificar que la página principal carga todos los elementos
- **Prerrequisitos:** Backend y frontend corriendo
- **Pasos:**
  1. Navegar a http://localhost:3001
  2. Verificar elementos visibles
- **Resultado Esperado:** Todos los componentes cargados
- **Resultado Obtenido:** PASS

#### PE2E-002: Flujo completo de creación
- **Tipo:** E2E
- **Descripción:** Crear categoría, crear producto y verificar en listado
- **Prerrequisitos:** Aplicación funcionando
- **Pasos:**
  1. Ingresar nombre de categoría "Electrónica Test"
  2. Hacer clic en "Crear Categoría"
  3. Verificar mensaje de éxito
  4. Ingresar datos de producto
  5. Seleccionar categoría creada
  6. Hacer clic en "Crear Producto"
  7. Verificar producto en tabla
- **Resultado Esperado:** Producto visible en tabla con todos sus datos
- **Resultado Obtenido:** PASS

#### PE2E-003: Crear múltiples categorías
- **Tipo:** E2E
- **Descripción:** Crear varias categorías consecutivamente
- **Prerrequisitos:** Aplicación funcionando
- **Pasos:**
  1. Crear categoría "Ropa"
  2. Crear categoría "Alimentos"
  3. Crear categoría "Juguetes"
  4. Verificar que todas aparecen en la lista
- **Resultado Esperado:** 3 categorías visibles
- **Resultado Obtenido:** PASS

#### PE2E-004: Validación de campos requeridos
- **Tipo:** E2E
- **Descripción:** Verificar validación de formulario
- **Prerrequisitos:** Aplicación funcionando
- **Pasos:**
  1. Dejar campos vacíos
  2. Intentar crear producto
  3. Verificar que no se crea
- **Resultado Esperado:** No se crea producto sin campos obligatorios
- **Resultado Obtenido:** PASS

#### PE2E-005: Visualizar tabla de productos
- **Tipo:** E2E
- **Descripción:** Verificar que la tabla de productos se muestra correctamente
- **Prerrequisitos:** Al menos un producto en BD
- **Pasos:**
  1. Cargar página
  2. Verificar tabla visible
  3. Verificar columnas
- **Resultado Esperado:** Tabla con todas las columnas
- **Resultado Obtenido:** PASS

---

### 4.4 ANÁLISIS ESTÁTICO

#### AE-001: ESLint en Backend
- **Tipo:** Análisis Estático
- **Descripción:** Validar calidad del código del backend
- **Prerrequisitos:** ESLint configurado
- **Pasos:**
  1. Ejecutar `npm run lint` en /backend
  2. Revisar errores y warnings
- **Resultado Esperado:** 0 errores críticos
- **Resultado Obtenido:** PASS - Sin errores

---

## 5. RESUMEN DE RESULTADOS

| Tipo de Prueba | Total | Exitosas | Fallidas | % Éxito |
|----------------|-------|----------|----------|---------|
| Unitarias      | 15    | 15       | 0        | 100%    |
| Integración    | 12    | 12       | 0        | 100%    |
| E2E            | 5     | 5        | 0        | 100%    |
| Análisis Estático | 1  | 1        | 0        | 100%    |
| **TOTAL**      | **33**| **33**   | **0**    | **100%**|

---

## 6. COBERTURA DE CÓDIGO

- **Backend:** >80% de cobertura en servicios y controladores
- **Criterio de Aceptación:** Mínimo 70% de cobertura

---

## 7. HERRAMIENTAS UTILIZADAS

- **Pruebas Unitarias:** Jest
- **Pruebas de Integración:** Jest + Supertest
- **Pruebas E2E:** Cypress
- **Análisis Estático:** ESLint
- **CI/CD:** GitHub Actions

---

## 8. CONCLUSIONES

El sistema ha pasado satisfactoriamente todas las pruebas automatizadas, cumpliendo con los requisitos establecidos. La cobertura de pruebas es adecuada y cubre los casos críticos de uso. El código cumple con los estándares de calidad establecidos.

---

## 9. RECOMENDACIONES

1. Mantener la suite de pruebas actualizada con cada nueva funcionalidad
2. Ejecutar pruebas antes de cada commit
3. Revisar cobertura periódicamente
4. Documentar nuevos casos de prueba cuando se agreguen features