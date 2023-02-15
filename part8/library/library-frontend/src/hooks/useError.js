import { useEffect, useState } from "react";

const useError = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) {
      return;
    }
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  return [error, setError];
};

export default useError;
