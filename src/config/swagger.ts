import swaggerJSDoc from 'swagger-jsdoc';

// Opciones de configuración de Swagger
const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0', // Especificación de OpenAPI
        info: {
            title: 'API REST Project Managment',
            version: '1.0.0',
            description: 'API Document',
        },
        servers: [
            {
                url: 'http://localhost:3005/api/v1', // URL base de la API
            },
        ],
    },
    apis: ['swagger.yml'], // Rutas de los archivos con la documentación de Swagger
};

// Generar la documentación de Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
