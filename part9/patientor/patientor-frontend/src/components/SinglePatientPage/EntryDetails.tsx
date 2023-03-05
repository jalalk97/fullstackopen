import { FC, ReactNode, useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import WorkIcon from "@mui/icons-material/Work";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

import { DiagnosesContext } from "../../context/diagnoses";
import {
  assertNever,
  BaseEntry,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

interface Props {
  entry: Entry;
}

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

const BaseEntryDetails: FC<
  BaseEntry & {
    icon: MuiIcon;
    children?: ReactNode;
  }
> = ({
  date,
  specialist,
  description,
  diagnosisCodes,
  icon: Icon,
  children,
}) => {
  const diagnoses = useContext(DiagnosesContext);

  const findDiagnosisName = (code: string): string | undefined => {
    return diagnoses.find((diagnosis) => diagnosis.code === code)?.name;
  };

  return (
    <div>
      <span>
        {date} <Icon />
      </span>
      <p>
        <em>{description}</em>
      </p>
      {!!diagnosisCodes ? (
        <ul>
          {diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {findDiagnosisName(code)}
            </li>
          ))}
        </ul>
      ) : null}
      {children}
      <div>Diagnosis by {specialist}</div>
      <hr />
    </div>
  );
};

const HospitalEntryDetails: FC<HospitalEntry> = ({
  id,
  date,
  specialist,
  description,
  diagnosisCodes,
  discharge,
}) => (
  <BaseEntryDetails
    id={id}
    date={date}
    specialist={specialist}
    description={description}
    diagnosisCodes={diagnosisCodes}
    icon={LocalHospitalIcon}
  >
    <p>
      Scheduled for discharge on {discharge.date} provided that:{" "}
      {discharge.criteria}
    </p>
  </BaseEntryDetails>
);

const OccupationalHealthcareEntryDetails: FC<OccupationalHealthcareEntry> = ({
  id,
  date,
  specialist,
  description,
  diagnosisCodes,
  employerName,
  sickLeave,
}) => (
  <BaseEntryDetails
    id={id}
    date={date}
    specialist={specialist}
    description={description}
    diagnosisCodes={diagnosisCodes}
    icon={WorkIcon}
  >
    <span>
      {" "}
      <p>
        Employer name: <em>{employerName}</em>
      </p>
    </span>
    {!!sickLeave ? (
      <p>
        Scheduled for sick leave from {sickLeave.startDate} to{" "}
        {sickLeave.endDate}
      </p>
    ) : null}
  </BaseEntryDetails>
);

const HealthCheckEntryDetails: FC<HealthCheckEntry> = ({
  id,
  date,
  specialist,
  description,
  diagnosisCodes,
  healthCheckRating,
}) => {
  let color: string;
  switch (healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = "green";
      break;
    case HealthCheckRating.LowRisk:
      color = "yellow";
      break;
    case HealthCheckRating.HighRisk:
      color = "orange";
      break;
    case HealthCheckRating.CriticalRisk:
      color = "red";
      break;
  }

  return (
    <BaseEntryDetails
      id={id}
      date={date}
      specialist={specialist}
      description={description}
      diagnosisCodes={diagnosisCodes}
      icon={MonitorHeartIcon}
    >
      <p>
        Health check rating: <FavoriteIcon sx={{ color }} />
      </p>
    </BaseEntryDetails>
  );
};

const EntryDetails: FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails {...entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails {...entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails {...entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
