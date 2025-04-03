import express from "express";
import cors from "cors";
import diagnoseRoute from "./routes/diagnoses";
import patientRoute from "./routes/patients";
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests only from these origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies, if your application uses them
    optionsSuccessStatus: 204, 
    // headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRoute);
app.use('/api/patients', patientRoute);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
