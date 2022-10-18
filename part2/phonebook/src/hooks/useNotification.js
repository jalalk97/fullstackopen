import { useState } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  const notify = (notificationObject) => {
    setNotification({...notificationObject});
    setTimeout(() => {
      setNotification({ message: null, isError: false });
    }, 3000);
  };

  return [notification, notify];
};

export default useNotification;
