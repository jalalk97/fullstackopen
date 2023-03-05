import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    res.json(patientService.getPatientById(id));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: "Unexpected server error",
      });
    }
  }
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(id, newEntry);
    res.status(201).json(addedEntry);
  } catch (error) {
    if (error instanceof Error) {
      console.error("an error occured:", error.message);
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: "Unexpected server error",
      });
    }
  }
});

export default router;
