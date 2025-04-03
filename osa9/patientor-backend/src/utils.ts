import { Gender, NewPatientEntry, EntryType, EntryWithoutId } from './types';
import { z } from 'zod';

export const NewEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});
/*
const diagnoseSchema = z.object({
    code: z.string(),
});
*/

export const HospitalSchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.string().array().optional(),
    type: z.nativeEnum(EntryType),
    discharge: z.object({date: z.string(), criteria: z.string()})
});

export const HealthCheckSchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.string().array().optional(),
    type: z.nativeEnum(EntryType),
    healthCheckRating: z.number().min(0).max(3)
});

export const OccupationalSchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.string().array().optional(),
    type: z.nativeEnum(EntryType),
    employerName: z.string(),
    sickLeave: z.object({startDate: z.string(), endDate: z.string()}).optional()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewEntrySchema.parse(object);
  };


export const toNewEntriesEntry = (object: EntryWithoutId) => {
    switch(object.type) {
        case EntryType.hospital:
            return HospitalSchema.parse(object);
        case EntryType.healthcheck:
            return HealthCheckSchema.parse(object);
        case EntryType.occupational:
            return OccupationalSchema.parse(object);
        default:
            throw new Error("It doesn't work");
    }
};