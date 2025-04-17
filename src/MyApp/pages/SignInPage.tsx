import { api } from "../api/axios";
import { useNavigate } from 'react-router-dom'
import { Button, CardContent, Card, TextField, Typography } from "@mui/material";
import { customButton } from "../mui-styles/buttons";
import { customForm } from "../mui-styles/forms";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { type FormValues } from "../types/types";
import { selectorAuth } from "../store/authSlice";
import * as Yup from 'yup';
import c from './Form.module.css'

const SignInPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  
  const formik = useFormik<Pick<FormValues, 'email' | 'password'>>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await api.post("auth/sign-in", values)
        if (response.status === 200) {
          dispatch(login({ 
            token: response.data.token,
            user: {
              id: response.data.user.id,
              username: response.data.user.username,
              email: response.data.user.email,
            }
          }
          ))
        navigate("/profile")
        }
      } catch (error) {
        console.log("Login error:", error)
      }
  }
  })

  if (useSelector(selectorAuth)) {
    return null
  }


  return (
    <Card elevation={24} sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Sign In
        </Typography>
        <div className={c.formContainerWrapper}>
          <form className={c.formContainer} onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="email"
              className={c.textField}
              sx={customForm.root}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="password"
              className={c.textField}
              sx={customForm.root}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button variant="outlined" type="submit" sx={customButton.root}>
              Submit
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
