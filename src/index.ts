import express, { json, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { NotFoundHandler } from './middleware/notFound';
import cors from 'cors';


const app = express();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json('Hello, World!');
});

app.use(NotFoundHandler);
app.use(errorHandler);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
