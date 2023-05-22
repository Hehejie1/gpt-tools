import { useState } from "react";

export const useLocalSync = (name: string, defaultValue?: any) => {
  const [value, setValue] = useState(
    window.localStorage.getItem(name) || defaultValue
  );

  const changeValue = async (changedValue: any) => {
    if (typeof changedValue === "function") {
      setValue((value: any) => {
        changedValue = changedValue(value);
        window.localStorage.setItem(name, changedValue);
        return changedValue;
      });
    } else {
      window.localStorage.setItem(name, changedValue);
      setValue(changedValue);
    }
  };

  return [value, changeValue];
};

