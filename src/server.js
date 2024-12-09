import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import routes from './routers/contacts.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(routes);

app.use(cors());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use('*', notFoundHandler);
app.use(errorHandler);

export const setupServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
