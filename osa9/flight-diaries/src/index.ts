import express from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests only from these origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies, if your application uses them
  optionsSuccessStatus: 204, 
  // headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});