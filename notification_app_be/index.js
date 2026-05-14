import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from '../logging_middleware/logger.js';
import notificationsRouter from './routes/notifications.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/notifications', notificationsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
