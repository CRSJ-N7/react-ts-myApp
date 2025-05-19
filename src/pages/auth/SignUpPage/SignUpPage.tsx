import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError, HttpStatusCode } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import AuthContainer from "../components/AuthContainer";
import { authApi } from "../../../api/authApi";
import { useAppDispatch } from "../../../store/store";
import { mainSliceActions } from "../../../store/main/mainSlice";
import c from "../styles/authStyles.module.css";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username length must not exceed 20 characters")
    .required("Required field"),
  email: Yup.string().email().required("Required field"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password length must not exceed 20 characters")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/,
      "The password must contain numbers, lowercase and uppercase letters."
    )
    .required("Required field"),
});

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const response = await authApi.signUp({
          username: formik.values.username,
          email: formik.values.email,
          password: formik.values.password,
        });
        if (HttpStatusCode.Ok) {
          console.log(response);
          dispatch(mainSliceActions.setUser(response));
          navigate("/profile");
          enqueueSnackbar(`Welcome ${response.username}!`, {
            variant: "success",
          });
        }
      } catch (error) {
        // Вот я нашёл как исправить ts ошибку в error, валидно ли это?
        // Поясни пожалуйста как правильно их надо типизировать, я не люблю красные штучки))
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
    <AuthContainer title="Sign Up">
      <form className={c.formContainer} onSubmit={formik.handleSubmit}>
        <TextField
          type="username"
          label="username"
          {...formik.getFieldProps("username")}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
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
          <span className={c.description}>Already have an account? </span>
          <Link to="/sign-in" style={{ textDecoration: "none" }}>
            <span className={c.link}>Sign In</span>
          </Link>
        </div>
      </form>
    </AuthContainer>
  );
};

export default SignUpPage;
