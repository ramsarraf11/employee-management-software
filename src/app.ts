import express, { Request, Response } from 'express';
import { globalErrorHandler } from './middlewares/error.middleware';
import { initializeRoutes } from './routes/indexRoutes';
import dotenv from 'dotenv';
import { Logger } from './utils/logger';
import cors from 'cors';
import path from 'path';
import methodOverride from 'method-override';

dotenv.config();

import session from 'express-session';
import flash from 'connect-flash';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));

Logger.instance().log('Starting server...');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(`/`, (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

initializeRoutes(app);

app.use(globalErrorHandler);

export { app };