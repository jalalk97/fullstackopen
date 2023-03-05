import { createContext, ReactNode, useEffect, useState } from "react";
import diagnosesService from "../services/diagnoses";
import { Diagnosis } from "../types";

type ContextValue = Diagnosis[];

export const DiagnosesContext = createContext<ContextValue>([]);

export const DiagnosesProvider = ({ children }: { children: ReactNode }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  return (
    <DiagnosesContext.Provider value={diagnoses}>
      {children}
    </DiagnosesContext.Provider>
  );
};
