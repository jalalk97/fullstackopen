import { DiagnosesContext } from "../../context/diagnoses";
import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import {
  DatePicker,
  DateRange,
  DateRangePicker,
  DateRangeValidationError,
  DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerChangeHandler } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import {
  assertNever,
  Entry,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { isAxiosError } from "axios";
import { dateISOString } from "../../utils";

interface FormProps {
  onSubmit: (entry: EntryWithoutId) => Promise<void>;
  onClose: () => void;
}

const HospitalEntryForm = ({ onClose, onSubmit }: FormProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [error, setError] = useState<string>();

  const diagnoses = useContext(DiagnosesContext);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setError(undefined);
    try {
      if (
        !date ||
        specialist === "" ||
        description === "" ||
        !dischargeDate ||
        dischargeCriteria === ""
      ) {
        throw new Error("Incorrect data: some fields are missing");
      }
      const newEntry: Omit<HospitalEntry, "id"> = {
        type: "Hospital",
        date: dateISOString(date),
        specialist,
        description,
        discharge: {
          date: dateISOString(dischargeDate),
          criteria: dischargeCriteria,
        },
      };
      if (diagnosisCodes.length) {
        newEntry.diagnosisCodes = diagnosisCodes;
      }
      onSubmit(newEntry);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error");
      }
    }
  };

  const handleDateChange: PickerChangeHandler<
    Date | null,
    DateValidationError
  > = (value) => {
    setDate(value);
  };

  const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialist(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleDischargeDateChange: PickerChangeHandler<
    Date | null,
    DateValidationError
  > = (value) => {
    setDischargeDate(value);
  };

  const handleDischargeCriteriaChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setDischargeCriteria(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={1}>
        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY-MM-DD"
            label="Date"
            value={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          value={specialist}
          onChange={handleSpecialistChange}
        />
        <TextField
          label="Descritpion"
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControl>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple={true}
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY-MM-DD"
            label="Discharge date"
            value={dischargeDate}
            onChange={handleDischargeDateChange}
          />
        </LocalizationProvider>
        <TextField
          label="Discharge criteria"
          value={dischargeCriteria}
          onChange={handleDischargeCriteriaChange}
        />
      </Stack>
      <Box mt={2}>
        <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth>
              Add Entry
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="button"
              onClick={onClose}
              variant="contained"
              color="error"
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

const OccupationalHealthcareEntryForm = ({ onClose, onSubmit }: FormProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<DateRange<Date>>([null, null]);
  const [error, setError] = useState<string>();

  const diagnoses = useContext(DiagnosesContext);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setError(undefined);
    try {
      if (
        !date ||
        specialist === "" ||
        description === "" ||
        employerName === ""
      ) {
        throw new Error("Incorrect data: some fields are missing");
      }
      const newEntry: Omit<OccupationalHealthcareEntry, "id"> = {
        type: "OccupationalHealthcare",
        date: dateISOString(date),
        specialist,
        description,
        employerName,
      };
      if (diagnosisCodes.length) {
        newEntry.diagnosisCodes = diagnosisCodes;
      }
      if (sickLeave.every((date) => !!date)) {
        newEntry.sickLeave = {
          startDate: dateISOString(sickLeave[0] as Date),
          endDate: dateISOString(sickLeave[1] as Date),
        };
      }
      onSubmit(newEntry);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error");
      }
    }
  };

  const handleDateChange: PickerChangeHandler<
    Date | null,
    DateValidationError
  > = (value) => {
    setDate(value);
  };

  const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialist(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleEmployerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployerName(event.target.value);
  };

  const handleSickLeaveChange: PickerChangeHandler<
    DateRange<Date>,
    DateRangeValidationError
  > = (value) => {
    setSickLeave(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={1}>
        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY-MM-DD"
            label="Date"
            value={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          value={specialist}
          onChange={handleSpecialistChange}
        />
        <TextField
          label="Descritpion"
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControl>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple={true}
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Employer name"
          value={employerName}
          onChange={handleEmployerNameChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            format="YYYY-MM-DD"
            localeText={{ start: "Sick leave start", end: "Sick leave end" }}
            value={sickLeave}
            onChange={handleSickLeaveChange}
          />
        </LocalizationProvider>
        <Box mt={2}>
          <Grid container columnSpacing={1}>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth>
                Add Entry
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                onClick={onClose}
                variant="contained"
                color="error"
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </form>
  );
};

const HealthCheckEntryForm = ({ onClose, onSubmit }: FormProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [error, setError] = useState<string>();

  const diagnoses = useContext(DiagnosesContext);

  const options = Object.entries(HealthCheckRating).slice(
    Object.entries(HealthCheckRating).length / 2
  );

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError(undefined);
    try {
      if (!date || specialist === "" || description === "") {
        throw new Error("Incorrect data: some fields are missing");
      }
      const newEntry: Omit<HealthCheckEntry, "id"> = {
        type: "HealthCheck",
        date: dateISOString(date),
        specialist,
        description,
        healthCheckRating,
      };
      if (diagnosisCodes.length) {
        newEntry.diagnosisCodes = diagnosisCodes;
      }
      await onSubmit(newEntry);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error");
      }
    }
  };

  const handleDateChange: PickerChangeHandler<
    Date | null,
    DateValidationError
  > = (value) => {
    setDate(value);
  };

  const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialist(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const handleHealthCheckRatingChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={1}>
        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY-MM-DD"
            label="Date"
            value={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          value={specialist}
          onChange={handleSpecialistChange}
        />
        <TextField
          label="Descritpion"
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControl>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple={true}
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Health check rating</FormLabel>
          <RadioGroup
            row
            value={healthCheckRating}
            onChange={handleHealthCheckRatingChange}
          >
            {options.map(([label, value]) => {
              return (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Stack>
      <Box mt={2}>
        <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth>
              Add Entry
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="button"
              onClick={onClose}
              variant="contained"
              color="error"
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>{" "}
    </form>
  );
};

interface Props {
  entryType: Entry["type"];
  onClose: () => void;
  onEntryAdded: (entry: EntryWithoutId) => Promise<void>;
}

const AddEntryForm = ({ entryType, onClose, onEntryAdded }: Props) => {
  switch (entryType) {
    case "Hospital":
      return <HospitalEntryForm onClose={onClose} onSubmit={onEntryAdded} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryForm
          onClose={onClose}
          onSubmit={onEntryAdded}
        />
      );
    case "HealthCheck":
      return <HealthCheckEntryForm onClose={onClose} onSubmit={onEntryAdded} />;
    default:
      return assertNever(entryType);
  }
};

export default AddEntryForm;
