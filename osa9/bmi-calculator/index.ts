import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

class ParameterError extends Error {
    status: number;
    message: string;
    constructor (message: string, statusCode: number) {
        super(message);
        this.status = statusCode;
        this.message = message;
        this.name = 'ParameterError';
        Object.setPrototypeOf(this, ParameterError.prototype);
    }
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const h = Number(_req.query.height);
    const w = Number(_req.query.weight);
    try {
        if(!isNaN(h) && !isNaN(w)) {
            const result = calculateBmi(w, h);
            const bmiObject = {weight: w, height: h, bmi: result};
            res.json(bmiObject);
        } else {
            throw new ParameterError('malformatted parameters', 404);
        }
    } catch(error: unknown) {
        let errorObject = {};
        if (error instanceof ParameterError) {
            errorObject = {error: error.message};
            console.log(error.status);
        }   
        res.json(errorObject);
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target } = req.body;
    if(!daily_exercises || !target) {
        res.status(404).send({error: 'parameters missing'});
    } else if(isNaN(Number(target))) {
        res.status(400).send({error: 'malformatted parameters'});
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});