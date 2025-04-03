"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests only from these origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies, if your application uses them
    optionsSuccessStatus: 204,
    // headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
