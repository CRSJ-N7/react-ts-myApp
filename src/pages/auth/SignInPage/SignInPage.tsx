import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError, HttpStatusCode } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";

import AuthContainer from "../components/AuthContainer";
import { authApi } from "../../../api/authApi";
import { useAppDispatch } from "../../../store/store";
import { mainSliceActions } from "../../../store/main/mainSlice";
import { type Form } from "../../../types";
import c from "../styles/authStyles.module.css";

const validationSchema = Yup.object({
  email: Yup.string().required("Required field"),
  password: Yup.string()
    .min(8, "Tip: Password must be at least 8 characters long")
    .max(20, "Tip: Password length must not exceed 20 characters")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/,
      "Tip: The password must contain numbers, lowercase and uppercase letters."
    ),
});

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik<Pick<Form, "email" | "password">>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const response = await authApi.signIn({
          email: formik.values.email,
          password: formik.values.password,
        });
        if (HttpStatusCode.Ok) {
          dispatch(mainSliceActions.setUser(response));
          enqueueSnackbar(`Welcome back ${response.username}!`, {
            variant: "success",
          });
          navigate("/profile");
        }
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
    <AuthContainer title="Sign In">
      <form className={c.formContainer} onSubmit={formik.handleSubmit}>
        <TextField
          type="email"
          label="email"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps("email")}
        />
        <TextField
          type="password"
          label="password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
        <div className={c.authFooter}>
          <span className={c.description}>Don't have an account?</span>
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            <span className={c.link}>Sign Up</span>
          </Link>
        </div>
      </form>
    </AuthContainer>
  );
};

export default SignInPage;
