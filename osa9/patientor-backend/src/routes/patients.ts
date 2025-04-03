import express from 'express';
import { Request, Response, NextFunction  } from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatientEntry, EntryWithoutId } from '../types';
import { NewEntrySchema, toNewEntriesEntry } from '../utils';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
      NewEntrySchema.parse(req.body);
      console.log(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
  };

  const newEntryParser = (req: Request<{id: string}, unknown, EntryWithoutId>, _res: Response, next: NextFunction) => {
    try {
      toNewEntriesEntry(req.body);
      next();
    } catch(error: unknown) {
      console.log(error);
      next(error);
    }
  };


  
  const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  };

router.get('/', (_req, res: Response<Patient[]>) => {
    res.send(patientService.getNoSensivitePatients());
});

router.get('/:id', (_req, res:Response<Patient>) => {
  const patient = _req.params.id;
  res.send(patientService.getPatient(patient));
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addNewPatient(req.body);
    res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req, res) => {
  const addedEntry = patientService.addNewEntry(req.params.id, req.body);
  console.log("Router", addedEntry);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;