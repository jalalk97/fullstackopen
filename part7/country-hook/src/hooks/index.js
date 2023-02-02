import { useState } from "react";
import countryService from "../services/countries";

export const useCountry = (query) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await countryService.get(query);
      setCountry(data[0]);
    } catch (error) {
      setCountry(null);
    } finally {
      setLoading(false);
    }
  };

  return [country, isLoading, handleSubmit];
};
