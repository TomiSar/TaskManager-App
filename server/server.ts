import express, {
  Express,
  Request,
  Response,
} from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './connection/db';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

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
