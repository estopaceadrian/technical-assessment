import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';
import { setupRoutes } from './routes';
import { setupSwagger } from './utils/swagger';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS)
});
app.use(limiter);

// Routes
setupRoutes(app);
setupSwagger(app);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app; 