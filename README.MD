# Proyecto DesafioLatam - Express

> -   Se agrego validacion del req.body con joi
> -   borrado de import innecesarios

TODO:

-   Pasar encriptación a la DB
-   seteo login con microsoft/google/otros auths

## Uso

Para levantar la DB en docker

```bash
docker-compose up
```

Para iniciar el servidor, ejecuta:

```bash
npm run dev
```

Para ejecutar los test respectivos

```bash
npm run test
```

Para revisar la info Swagger, ir a
`/api/v1/api-docs/`

El servidor estará disponible en `http://localhost:3000` por default,
Puerto configurable según .env PORT

CONSIDERAR QUE EL JTW UTILIZADO TIENE UN TIEMPO DE EXPIRACIÓN DEFAULT DE 2 HORAS PARA TESTEO. CONSIDERAR AJUSTARLO EN LOS LLAMADOS DE LA FUNCIÓN `generateToken` o en la definición de la misma en token.utils.ts

# DIAGRAMA DE DB

-- Creado en https://dbdiagram.io/d --

![Diagrama de la Base de Datos](./diagramaDB.svg)

# Rutas

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
