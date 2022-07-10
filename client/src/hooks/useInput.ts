import { ChangeEvent, useState } from "react";

interface DefaultValue {
  value: string;
  error: boolean;
  helperText: string;
}

export interface UseInput {
  props: {
    value: string;
    error: boolean;
    helperText: string;
    onChange: (e: ChangeEvent<any>) => void;
  };
  setError: (v: boolean) => void;
  setHelperText: (v: string) => void;
  emptyHelperText: string;
}

export function useInput(
  emptyHelperText: string,
  defaultValue: DefaultValue = { value: "", error: false, helperText: "" }
): UseInput {
  const [value, setValue] = useState(defaultValue.value);
  const [error, setError] = useState(defaultValue.error);
  const [helperText, setHelperText] = useState(defaultValue.helperText);

  const onChange = (e: ChangeEvent<any>) => {
    const {
      target: { value },
    } = e;

    setValue(value);
    setError(!value);
    setHelperText(!value ? emptyHelperText : "");
  };

  return { props: { value, onChange, error, helperText }, setError, setHelperText, emptyHelperText };
}
