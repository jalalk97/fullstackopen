import {
  Diagnosis,
  EntryType,
  EntryWithoutId,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthcareEntry,
} from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  let newEntry: Partial<EntryWithoutId>;

  if (
    "type" in object &&
    "date" in object &&
    "specialist" in object &&
    "description" in object
  ) {
    newEntry = {
      type: parseType(object.type),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
    };
  } else {
    throw new Error("Incorrect data: some required fields are missing");
  }

  if ("diagnosisCodes" in object) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  switch (object.type) {
    case "Hospital":
      if ("discharge" in object) {
        const newHospitalEntry = {
          ...newEntry,
          discharge: parseDischarge(object.discharge),
        } as Omit<HospitalEntry, "id">;
        return newHospitalEntry;
      } else {
        throw new Error(
          "Incorrect data: some required fields are missing: discharge"
        );
      }

    case "OccupationalHealthcare":
      if (!("employerName" in object)) {
        throw new Error(
          "Incorrect data: some required fields are missing: employerName"
        );
      }
      const newOccupationalHealthcareEntry = {
        ...newEntry,
        employerName: parseName(object.employerName),
      } as Omit<OccupationalHealthcareEntry, "id">;
      if ("sickLeave" in object) {
        newOccupationalHealthcareEntry.sickLeave = parseSickLeave(
          object.sickLeave
        );
      }
      return newOccupationalHealthcareEntry;

    case "HealthCheck":
      if ("healthCheckRating" in object) {
        const newHealthCheckEntry = {
          ...newEntry,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        } as Omit<HealthCheckEntry, "id">;
        return newHealthCheckEntry;
      } else {
        throw new Error(
          "Incorrect data: some required fields are missing: discharge"
        );
      }

    default:
      throw new Error(`Unsupported entry type: ${object.type}`);
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect of missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing social security number");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const isEntryType = (param: string): param is EntryType => {
  return ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(param);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error("Incorrect or missing entry type");
  }
  return type;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes || typeof diagnosisCodes !== "object") {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }
  return diagnosisCodes as Array<Diagnosis["code"]>;
};

interface Discharge {
  date: string;
  criteria: string;
}

const isDischarge = (param: object): param is Discharge => {
  if (!("date" in param) || !("criteria" in param)) {
    return false;
  }
  if (
    !isString(param.date) ||
    !isDate(param.date) ||
    !isString(param.criteria)
  ) {
    return false;
  }
  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object" || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }
  return discharge;
};

interface SickLeave {
  startDate: string;
  endDate: string;
}

const isSickLeave = (param: object): param is SickLeave => {
  if (!("startDate" in param) || !("endDate" in param)) {
    return false;
  }
  if (!isString(param.startDate) || !isString(param.endDate)) {
    return false;
  }
  if (!isDate(param.startDate) || !isDate(param.endDate)) {
    return false;
  }
  return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object" || !isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing sickLeave");
  }
  return sickLeave;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  console.log(Object.values(HealthCheckRating));
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    typeof healthCheckRating !== "number" ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};
