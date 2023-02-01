import { useState } from "react";

const initialValue = "";

export const useField = (type) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(initialValue)
  }

  return [{type, value, onChange}, reset];
};
