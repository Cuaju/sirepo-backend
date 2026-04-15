import express from 'express';
import dotenv from 'dotenv';
import authenticationRoutes from './routes/authentication.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'authentication_service'
  });
});

app.use('/authentication', authenticationRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Authentication Service running on port: ${PORT}`);
});