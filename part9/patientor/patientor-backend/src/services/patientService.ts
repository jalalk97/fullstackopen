import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatientData,
  Patient,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (patientId: string): Patient => {
  const patient: Patient | undefined = patients.find(
    (patient) => patient.id === patientId
  );
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = getPatientById(patientId);
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntryToPatient,
};
