# Sistema de Gestión de Proyectos

## Descripción General

Esta aplicación es un sistema completo de gestión de proyectos construido con Node.js, Express, TypeScript y PostgreSQL. Permite a las organizaciones gestionar proyectos, usuarios y tareas de manera eficiente con funcionalidades de colaboración en tiempo real.

### Características Principales

-   **Autenticación de Usuarios**: Registro e inicio de sesión seguros con JWT.
-   **Control de Acceso Basado en Roles**: Diferentes niveles de permisos para roles de Administrador, Gestor de Proyectos, Desarrollador y Cliente.
-   **Gestión de Proyectos**: Crear, actualizar, asignar y seguir proyectos con diferentes indicadores de estado.
-   **Chat en Tiempo Real**: Sistema de chat integrado para comunicación en equipo con salas de chat.
-   **API RESTful**: Endpoints de API bien documentados con Swagger.
-   **Base de Datos Dockerizada**: Configuración sencilla de PostgreSQL con Docker.

### TODO

-   Implementar encriptación directamente en la base de datos.
-   Configurar autenticación con **Microsoft**, **Google** u otros sistemas.
-   Ampliar funcionalidades para proyectos personales.

## Uso

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

-   **Node.js** (v16 o superior)
-   **Docker** y **Docker Compose**
-   **npm** o **yarn**

## Pasos para Configuración y Ejecución

### 1. Levantar la Base de Datos con Docker

Ejecuta el siguiente comando para iniciar la base de datos utilizando Docker Compose:

```bash
docker-compose up
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y configura las variables necesarias. Puedes usar el archivo `.env.example` como referencia.

```bash
PORT = 3005
SECRET_KEY_JWT= "AXXXAf/14ACX"
DATABASE_URL = "postgresql://postgres:root@localhost:5434/dbtest"
MAIN_PATH = "/api/v1"
```

### 3. Instalar Dependencias

Instala las dependencias del proyecto ejecutando:

```bash
npm install
```

o si prefieres yarn:

```bash
yarn install
```

### 4. Levantar Docker localmente

```bash
docker-compose up
```

### 5. Iniciar el Servidor

Para iniciar el servidor en modo desarrollo, ejecuta:

```bash
npm run dev
```

o con yarn:

```bash
yarn dev
```

El servidor estará disponible en `http://localhost:3000` por defecto. Puedes cambiar el puerto configurando la variable `PORT` en el archivo `.env`.

### 6. Ejecutar Pruebas

Para ejecutar las pruebas del proyecto, utiliza:

```bash
npm run test
```

o con yarn:

```bash
yarn test
```

### 7. Documentación de la API

Para revisar la documentación de la API generada con Swagger, accede a:

```
http://localhost:3000/api/v1/api-docs/
```

### Nota Importante

El token JWT utilizado tiene un tiempo de expiración predeterminado de 2 horas para propósitos de prueba. Si necesitas ajustarlo, modifica los parámetros en la función `generateToken` ubicada en `token.utils.ts`.

# DIAGRAMA DE DB

-- Creado en https://dbdiagram.io/d --

![Diagrama de la Base de Datos](./diagramaDB.svg)

# Endpoints de la API

El proyecto tiene configurado Swagger, por lo que es posible visualizar y testear las rutas en ese lugar. Se cuenta con 3 rutas.

El path base se puede setear en el .env, pero por default se considera como referencia "/api/v1"

## Rutas de Autenticación (Auth)

### POST /auth/login

-   **Descripción**: Iniciar sesión de un usuario con email y contraseña.
-   **Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
-   **Autenticación Requerida**: No
-   **Retorna**:
    ```json
    {
        "token": "JWT token"
    }
    ```

### POST /auth/register

-   **Descripción**: Registrar un nuevo usuario con email y contraseña. (Rol es opcional, pero en caso de no entragarlo sera por defecto "Dev")
-   **Body**:
    ```json
    {
        "name": "John",
        "last_name": "Doe",
        "email": "user@example.com",
        "password": "password123",
        "role": "Admin"
    }
    ```
-   **Autenticación Requerida**: No
-   **Retorna**:
    ```json
    {
        "token": "JWT token"
    }
    ```

## Rutas de Usuario (User)

### GET /user

-   **Descripción**: Obtener todos los usuarios.
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Lista de usuarios
    ```json
    [
        {
            "id": "uuid",
            "name": "John",
            "last_name": "Doe",
            "email": "user@example.com",
            "role": "Dev",
            "is_active": true,
            "created_date": "2025-01-16T01:26:37.132Z",
            "updatedAt": "2025-01-16T01:26:37.132Z"
        }
        // ...otros usuarios
    ]
    ```

### GET /user/:id

-   **Descripción**: Obtener un usuario por ID.
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Objeto de usuario
    ```json
    {
        "id": "uuid",
        "name": "John",
        "last_name": "Doe",
        "email": "user@example.com",
        "role": "Dev",
        "is_active": true,
        "created_date": "2025-01-16T01:26:37.132Z",
        "updatedAt": "2025-01-16T01:26:37.132Z"
    }
    ```

### POST /user

-   **Descripción**: Crear un nuevo usuario.
-   **Body**:
    ```json
    {
        "name": "John",
        "last_name": "Doe",
        "email": "user@example.com",
        "password": "password123",
        "role": "Dev"
    }
    ```
-   **Autenticación Requerida**: Sí (JWT, Admin)
-   **Retorna**: Objeto de usuario creado
    ```json
    {
        "id": "uuid",
        "name": "John",
        "last_name": "Doe",
        "email": "user@example.com",
        "role": "Dev",
        "is_active": true,
        "created_date": "2023-01-01T00:00:00.000Z"
    }
    ```

### PUT /user/:id

-   **Descripción**: Actualizar información de un usuario.
-   **Body**:
    ```json
    {
        "name": "John",
        "last_name": "Doe",
        "email": "user@example.com",
        "password": "newpassword123",
        "role": "Admin"
    }
    ```
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Objeto de usuario actualizado
    ```json
    {}
    ```

### DELETE /user/:id

-   **Descripción**: Eliminar un usuario por ID.
-   **Autenticación Requerida**: Sí (JWT, Admin)

## Rutas de Proyecto (Project)

### GET /projects

-   **Descripción**: Obtener todos los proyectos.
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Lista de proyectos
    ```json
    [
        {
            "created_date": "2025-01-16T02:20:36.693Z",
            "id": "bc3618b6-41d0-4d53-9f48-335bd60f5710",
            "status": "notStarted",
            "name": "string",
            "description": "string",
            "created_by": "c515a94b-3601-4ad2-9666-96dff78aeb73",
            "updatedAt": "2025-01-16T02:20:36.693Z",
            "start_date": null,
            "end_date": null
        }
        // ...otros proyectos
    ]
    ```

### GET /projects/:id

-   **Descripción**: Obtener un proyecto por ID.
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Objeto de proyecto
    ```json
    {
        "id": "bc3618b6-41d0-4d53-9f48-335bd60f5710",
        "name": "string",
        "description": "string",
        "created_date": "2025-01-16T02:20:36.693Z",
        "start_date": null,
        "end_date": null,
        "status": "notStarted",
        "created_by": "c515a94b-3601-4ad2-9666-96dff78aeb73",
        "updatedAt": "2025-01-16T02:20:36.693Z"
    }
    ```

### POST /projects

-   **Descripción**: Crear un nuevo proyecto.
-   **Body**:
    ```json
    {
        "name": "New Project",
        "description": "Project description"
    }
    ```
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Objeto de proyecto creado
    ```json
    {
        "newProject": {
            "created_date": "2025-01-16T02:20:36.693Z",
            "id": "bc3618b6-41d0-4d53-9f48-335bd60f5710",
            "status": "notStarted",
            "name": "string",
            "description": "string",
            "created_by": "c515a94b-3601-4ad2-9666-96dff78aeb73",
            "updatedAt": "2025-01-16T02:20:36.693Z",
            "start_date": null,
            "end_date": null
        }
    }
    ```

### DELETE /projects/:id

-   **Descripción**: Eliminar un proyecto por ID.
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Objeto de proyecto eliminado
    ```json
    1
    ```

### POST /projects/update/:projectId

-   **Descripción**: Actualizar información de un proyecto.
-   **Body**:
    ```json
    {
        "name": "string",
        "description": "string",
        "start_date": "2025-01-16T02:23:03.345Z",
        "end_date": "2025-01-16T02:23:03.345Z",
        "status": "done"
    }
    ```
-   **Autenticación Requerida**: Sí (JWT)
-   **Retorna**: Objeto de proyecto actualizado

    ```json
    {
        "updatedProject": {
            "id": "a8eb4546-cbb6-438c-8e4b-9bfa08446848",
            "name": "string",
            "description": "string",
            "created_date": "2025-01-16T02:21:07.515Z",
            "start_date": "2025-01-16T02:23:03.345Z",
            "end_date": "2025-01-16T02:23:03.345Z",
            "status": "done",
            "created_by": "c515a94b-3601-4ad2-9666-96dff78aeb73",
            "updatedAt": "2025-01-16T02:23:24.763Z"
        }
    }
    ```

    ***

    ## Créditos

    Este proyecto fue desarrollado como parte de un desafío de **Desafío Latam**.
