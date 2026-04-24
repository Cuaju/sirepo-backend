import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication Service API SIREPO ',
      version: '1.0.0',
      description: 'API documentation for the authentication microservice from SIREPO software made for the CEOA deployed on the azure DGTI infrastructure'
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local server'
      }
    ],
    components: {
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'admin'
            },
            password: {
              type: 'string',
              example: 'admin123'
            }
          }
        },
        TokenLoginRequest: {
          type: 'object',
          required: ['accessToken'],
          properties: {
            accessToken: {
              type: 'string',
              example: 'some-external-access-token'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            authToken: {
              type: 'string',
              example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Invalid credentials'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;