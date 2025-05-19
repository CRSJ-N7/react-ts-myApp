import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { authApi } from "../../../api/authApi";
import { useAppDispatch } from "../../../store/store";
import { mainSliceActions } from "../../../store/main/mainSlice";
import { User } from "../../../types";
import c from "../ProfilePage.module.css";

type EditingTabProps = {
  user: User;
};

const EditingTab = (props: EditingTabProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const usernameSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username length must not exceed 20 characters")
      .required("Required field"),
  });

  const emailSchema = Yup.object({
    email: Yup.string().email().required("Required field"),
  });

  const usernameFormik = useFormik({
    initialValues: {
      username: props.user.username,
    },
    validationSchema: usernameSchema,
    onSubmit: async () => {
      try {
        const response = await authApi.updateProfile({
          username: usernameFormik.values.username,
        });
        dispatch(mainSliceActions.setUser(response));
        enqueueSnackbar(`Username updated!`, {
          variant: "success",
        });
        navigate("/profile");
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

  const emailFormik = useFormik({
    initialValues: {
      email: props.user.email,
    },
    validationSchema: emailSchema,
    onSubmit: async () => {
      try {
        const response = await authApi.updateProfile({
          email: emailFormik.values.email,
        });
        dispatch(mainSliceActions.setUser(response));
        enqueueSnackbar(`Email updated!`, {
          variant: "success",
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          enqueueSnackbar(`${error.response.data.message}`, {
            variant: "error",
          });
          navigate("/profile");
        } else {
          console.log("Unknown error occurred");
          enqueueSnackbar("Unknown error occurred", { variant: "error" });
        }
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={usernameFormik.handleSubmit}
        className={c.textFieldContainer}
      >
        <TextField
          className={c.textField}
          variant="standard"
          id="username"
          name="username"
          value={usernameFormik.values.username}
          onChange={usernameFormik.handleChange}
          onBlur={usernameFormik.handleBlur}
          error={
            usernameFormik.touched.username &&
            Boolean(usernameFormik.errors.username)
          }
          helperText={
            usernameFormik.touched.username && usernameFormik.errors.username
          }
        />
        <Button
          variant="outlined"
          type="submit"
          disabled={usernameFormik.isSubmitting}
        >
          Save
        </Button>
      </form>
      <form
        onSubmit={emailFormik.handleSubmit}
        className={c.textFieldContainer}
      >
        <TextField
          className={c.textField}
          variant="standard"
          id="email"
          name="email"
          value={emailFormik.values.email}
          onChange={emailFormik.handleChange}
          onBlur={emailFormik.handleBlur}
          error={emailFormik.touched.email && Boolean(emailFormik.errors.email)}
          helperText={emailFormik.touched.email && emailFormik.errors.email}
        />
        <Button
          variant="outlined"
          type="submit"
          disabled={emailFormik.isSubmitting}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditingTab;
