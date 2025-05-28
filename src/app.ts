import express from 'express';
import cors from 'cors';
import {userRouter} from './routes';

const app = express();
app.use(express.json());
app.use(cors());

const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/users`, userRouter)

export default app;