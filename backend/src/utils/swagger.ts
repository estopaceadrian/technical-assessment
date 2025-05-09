import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API for managing tasks and users'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}; 