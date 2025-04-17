import { api } from "../api/axios";
import { useFormik } from "formik";
import { type FormValues } from "../types/types";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { customForm } from "../mui-styles/forms";
import { customButton } from "../mui-styles/buttons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import c from './Form.module.css';
import * as Yup from 'yup';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      ).required("Required field")
  });

  const formik = useFormik<FormValues>({
      initialValues: {
        email: "",
        password: "",
        username: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        try {
      const response = await api.post("auth/sign-up", values);
      console.log(response);
      if (response.status === 201) {
        dispatch(login({
          token: response.data.token,
          user: {
            username: response.data.safeUser.username,
            id: response.data.safeUser.id,
            email: response.data.safeUser.email,
          }
        }))
        console.log(response.data.safeUser);
        navigate("/profile");
      }
        }
        catch (error) {

          console.log(error);
        }
      }})
  
  return (
    <Card elevation={24} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Sign Up
      </Typography>
    <div className={c.formContainerWrapper}>
    <form className={c.formContainer} onSubmit={formik.handleSubmit}>
      <TextField
        id="username"
        name="username"
        type="username"
        label="username"
        className={c.textField}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={customForm.root}
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <TextField
        id="email"
        name="email"
        type="email"
        label="email"
        className={c.textField}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={customForm.root}
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="password"
        className={c.textField}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={customForm.root}
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Button variant="outlined" type="submit" sx={customButton.root}>
        Register
      </Button>
    </form>
    </div>
    </CardContent>
    </Card>
  );
};

export default SignUpPage;