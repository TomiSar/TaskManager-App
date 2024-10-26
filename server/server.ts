import express, { Express } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { initializeDatabase } from './connection/db';
import { taskRouter } from './routes/taskRouter';
import { authRouter } from './routes/authRouter';

const app: Express = express();
const PORT = process.env.PORT || 5000;

if (!process.env.CLIENT_URL) {
  throw new Error(
    'Missing CLIENT_URL in environment variables. Please check your .env file.',
  );
}

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));

(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () =>
      console.log(
        colors.rainbow(`Server running on port ${PORT}.`),
      ),
    );
  } catch (err) {
    console.error(
      'Error during server initialization:',
      err,
    );
  }
})();

// Routes
app.use('/api/tasks', taskRouter);
app.use('/api/users', authRouter);
