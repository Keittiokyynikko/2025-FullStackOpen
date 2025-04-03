import express from 'express';
import { Response } from 'express';
import { Diagnose } from '../types';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
  res.send(diagnoseService.getNoSensiviteDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;