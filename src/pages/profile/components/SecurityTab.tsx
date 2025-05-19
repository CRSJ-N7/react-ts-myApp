import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";

import { authApi } from "../../../api/authApi";
import { useAppDispatch } from "../../../store/store";
import { mainSliceActions } from "../../../store/main/mainSlice";
import c from "../ProfilePage.module.css";

const SecurityTab = () => {
  const dispatch = useAppDispatch();

  const passwordChema = Yup.object({
    password: Yup.string()
      .min(8, "Tip: Password must be at least 8 characters long")
      .max(20, "Tip: Password length must not exceed 20 characters")
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/,
        "Tip: The password must contain numbers, lowercase and uppercase letters."
      ),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      passwordCheck: "",
    },
    validationSchema: passwordChema,
    onSubmit: async () => {
      if (formik.values.newPassword !== formik.values.passwordCheck) {
        enqueueSnackbar(`Passwords do not match`, {
          variant: "warning",
        });
        return;
      }
      try {
        const response = await authApi.updatePassword({
          currentPassword: formik.values.currentPassword,
          newPassword: formik.values.newPassword,
        });
        dispatch(mainSliceActions.setUser(response));
        enqueueSnackbar(`Password updated!`, {
          variant: "success",
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          enqueueSnackbar(`${error.response.data.message}`, {
            variant: "error",
          });
        } else {
          console.log("Unknown error occurred");
          enqueueSnackbar("Unknown error occurred", { variant: "error" });
        }
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div
          className={c.passwordForm}
          style={{ display: "flex", flexDirection: "column", marginRight: 100 }}
        >
          <TextField
            name="currentPassword"
            id="currentPassword"
            label="current password"
            variant="standard"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
          <TextField
            name="newPassword"
            id="newPassword"
            label="new password"
            variant="standard"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            name="passwordCheck"
            id="passwordCheck"
            label="repeat new password"
            variant="standard"
            type="password"
            value={formik.values.passwordCheck}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.passwordCheck &&
              Boolean(formik.errors.passwordCheck)
            }
            helperText={
              formik.touched.passwordCheck && formik.errors.passwordCheck
            }
          />
        </div>
        <Button
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SecurityTab;
