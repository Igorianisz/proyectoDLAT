-- Active: 1733258988286@@127.0.0.1@5434@dbtest@public
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS user_project;

DROP TABLE IF EXISTS user_task;

DROP TABLE IF EXISTS task;

DROP TABLE IF EXISTS project;

DROP TABLE IF EXISTS users;

-- Esto setea los tipos de roles y de status de los proyectos y tareas
-- considera que si ya existe simplemente elimina el tipo y lo vuelve a crear
-- para evitar errores
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_user_role') THEN
        DROP TYPE enum_user_role;
    END IF;

    CREATE TYPE enum_user_role AS ENUM (
        'Admin',
        'PM',
        'Dev',
        'Client'
    );
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_status') THEN
        DROP TYPE enum_status;
    END IF;

    CREATE TYPE enum_status AS ENUM (
        'done',
        'inProgress',
        'delayed',
        'notStarted',
        'cancelled'
    );
END $$;
-- tabla de usuarios IUser
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    created_date DATE DEFAULT NOW(),
    role enum_user_role NOT NULL
);

-- Creación de tabla de proyectos, esta
CREATE TABLE project (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_date DATE DEFAULT NOW(),
    start_date DATE,
    end_date DATE,
    status enum_status DEFAULT 'notStarted',
    created_by UUID NOT NULL
);

-- Creacion de tabla de tareas
CREATE TABLE task (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_date DATE DEFAULT NOW(),
    start_date DATE,
    end_date DATE,
    status enum_status DEFAULT 'notStarted',
    project_id UUID NOT NULL,
    created_by UUID NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (id)
);
--Tabla de relaciones de los usuarios que estan asignados a un proyecto
CREATE TABLE user_project (
    user_id UUID NOT NULL,
    project_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (project_id) REFERENCES project (id)
);
-- Tabla de relaciones de los usuarios asignados a una tarea
CREATE TABLE user_task (
    user_id UUID NOT NULL,
    task_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (task_id) REFERENCES task (id)
);

INSERT INTO
    users (
        name,
        last_name,
        email,
        password,
        role
    )
VALUES (
        'Admin',
        'Test',
        'Admin@admin.123',
        'admin',
        'Admin'
    );