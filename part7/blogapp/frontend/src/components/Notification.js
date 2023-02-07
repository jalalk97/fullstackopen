import { Alert, AlertTitle } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  const severity = notification.type === "alert" ? "error" : "info";

  return (
    <Alert id="notification" severity={severity}>
      <AlertTitle textTransform="capitalize">{severity}</AlertTitle>
      {notification.message}
    </Alert>
  );
};

export default Notification;
