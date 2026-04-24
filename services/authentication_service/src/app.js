import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import authenticationRoutes from './routes/authentication.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import swaggerSpec from './config/swagger.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'authentication_service'
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/authentication', authenticationRoutes);

app.use(errorMiddleware);

export default app;