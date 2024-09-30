import express, { Express } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './connection/db';
import { taskRouter } from './routes/taskRouter';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        colors.rainbow(`Server running on port ${PORT}.`),
      ),
    );
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization: ',
      err,
    );
  });

// Routes
app.use('/api/tasks', taskRouter);
