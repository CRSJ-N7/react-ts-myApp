import { buttonColors } from "./colors";

export const customButton = {
  root: {
    color: buttonColors.text,
    backgroundColor: buttonColors.background,
    '&:hover': {
      backgroundColor: buttonColors.backgroundHover,
    },
    '&.Mui-focusVisible': {
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      color: buttonColors.text,
      backgroundColor: buttonColors.background,
    },
  },  
};