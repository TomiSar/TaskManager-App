import express, {
  Express,
  Request,
  Response,
} from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () =>
  console.log(
    colors.rainbow(`Server running on port ${PORT}.`),
  ),
);
