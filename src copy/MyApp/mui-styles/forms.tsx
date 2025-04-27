import { SxProps } from '@mui/material';
import { formColors } from './colors';

export const customForm: NonNullable<SxProps> = {
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: formColors.text,
    "&.Mui-focused": {
      color: formColors.secondary,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1.1rem",
    color: formColors.text,
    padding: "12px 14px",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: formColors.border,
    },
    "&:hover fieldset": {
      borderColor: formColors.borderHover,
    },
    "&.Mui-focused fieldset": {
      borderColor: formColors.borderFocus,
      borderWidth: "2px",
    },
  },
  "& .MuiFormHelperText-root": {
    color: formColors.error,
    fontSize: "0.9rem",
    whiteSpace: "wrap",
    wordBreak: "break-word",
  },
};