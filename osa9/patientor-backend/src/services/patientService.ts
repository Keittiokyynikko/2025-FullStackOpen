import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, PatientEntry, NewPatientEntry, EntryWithoutId, Entry } from '../types';

const getNoSensivitePatients = (): Patient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatient = (id: string): Patient | undefined => {
    console.log(patients.find(p => p.id === id));
    return patients.find(p => p.id === id);
};

const addNewPatient = (entry: NewPatientEntry): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const new_id = uuid();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = {id: new_id, ...entry};
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addNewEntry = (id: string, entry: EntryWithoutId): Entry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const new_id: string = uuid();
    const patient = patients.find(p => p.id === id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = {id: new_id, ...entry};
    if(patient) {
        patient?.entries?.push(newEntry);
        console.log("Got it!", patient);
    }
    return newEntry;
};

export default {
    getNoSensivitePatients,
    addNewPatient,
    getPatient,
    addNewEntry
};