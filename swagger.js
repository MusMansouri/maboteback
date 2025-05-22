// Swagger configuration for API documentation
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mabote API',
      version: '1.0.0',
      description: 'Documentation de l’API Mabote (Node.js/Express)'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Serveur local'
      }
    ]
  },
  apis: ['./routes/*.js'], // Documentation dans les fichiers de routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
