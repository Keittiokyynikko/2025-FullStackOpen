import axios from "axios";
import { PatientEntry, Patient, PatientFormValues, Diagnose, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string | undefined) => {
  const { data } = await axios.get<PatientEntry>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addNewEntry = async (id: string | undefined, object: EntryWithoutId) => {
  console.log("service", id, object);
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

export default {
  getAll, create, getPatient, getDiagnoses, addNewEntry
};

