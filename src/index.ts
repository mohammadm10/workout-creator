import express, { json, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { NotFoundHandler } from './middleware/notFound';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json('Hello, World!');
});

app.use(NotFoundHandler);
app.use(errorHandler);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
