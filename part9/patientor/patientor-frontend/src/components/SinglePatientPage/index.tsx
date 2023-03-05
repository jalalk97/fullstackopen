import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import { Entry, entryTypeLabels, EntryWithoutId, Patient } from "../../types";
import AddEntryModal from "./AddEntryModal";
import EntryDetails from "./EntryDetails";

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<Entry["type"]>("Hospital");
  const [notification, setNotification] = useState<string>();

  const params = useParams();

  useEffect(() => {
    const fetchPatient = async (id: String) => {
      const patient: Patient = await patientsService.getById(id);
      setPatient(patient);
    };
    if (params.id) {
      fetchPatient(params.id);
    }
  }, [params]);

  if (!patient) {
    return null;
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = ({ target }: SelectChangeEvent<Entry["type"]>) => {
    const value = target.value as Entry["type"];
    setEntryType(value);
  };

  const addEntryToPatient = async (newEntry: EntryWithoutId) => {
    const createdEntry = await patientsService.addEntryToPatient(
      patient.id,
      newEntry
    );
    const updatedEntries = patient.entries.concat(createdEntry);
    setPatient({
      ...patient,
      entries: updatedEntries,
    });
    setModalOpen(false);
    setNotification("New entry successfully added");
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };

  const { name, gender, ssn, dateOfBirth, occupation, entries } = patient;

  return (
    <>
      {notification && (
        <Box mt={2}>
          <Alert severity="info">{notification}</Alert>
        </Box>
      )}
      <Typography variant="h4">{name}</Typography>
      <p>gender: {gender}</p>
      <p>ssn: {ssn}</p>
      <p>date of birth: {dateOfBirth}</p>
      <p>occupation: {occupation}</p>
      <Typography variant="h5">Entries</Typography>
      <Stack my={3} direction="row" columnGap={1}>
        <FormControl fullWidth>
          <InputLabel id="entry-type-label">Entry type</InputLabel>
          <Select
            labelId="entry-type-label"
            value={entryType}
            label="Entry type"
            onChange={handleChange}
          >
            {Object.entries(entryTypeLabels).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ minWidth: "15ch" }}
          variant="contained"
          onClick={openModal}
        >
          New Entry
        </Button>
      </Stack>
      {entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onEntryAdded={addEntryToPatient}
        entryType={entryType}
      />
    </>
  );
};

export default SinglePatientPage;
