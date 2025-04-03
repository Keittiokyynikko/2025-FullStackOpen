/*

import { z } from 'zod';
import { NewEntrySchema } from './utils';
*/

export enum EntryType {
    hospital = "Hospital",
    healthcheck = "HealthCheck",
    occupational = "OccupationalHealthcare"

}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType;
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: EntryType;
    discharge: Discharge;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType;
  healthCheckRating: HealthCheckRating;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
};

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
};

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[];
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Diagnose = DiagnoseEntry;

export type Patient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;