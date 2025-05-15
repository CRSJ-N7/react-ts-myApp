import React from "react";
import { User } from "../../../types";
import c from "../ProfilePage.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";

type EditingTabProps = {
  user: User;
};

const EditingTab = (props: EditingTabProps) => {
  const [userName] = React.useState(props.user.username);
  const [userEmail] = React.useState(props.user.email);

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
    onSubmit: () => {
      console.log("something");
    },
  });

  const emailFormik = useFormik({
    initialValues: {
      email: props.user.email,
    },
    validationSchema: emailSchema,
    onSubmit: () => {
      console.log("something");
    },
  });

  const handleSave = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      <div className={c.textFieldContainer}>
        <TextField
          className={c.textField}
          variant='standard'
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
        <Button onClick={() => handleSave(userName)}>Save</Button>
      </div>
      <div className={c.textFieldContainer}>
        <TextField
          className={c.textField}
          variant='standard'
          id="email"
          name="email"
          value={emailFormik.values.email}
          onChange={emailFormik.handleChange}
          onBlur={emailFormik.handleBlur}
          error={
            emailFormik.touched.email &&
            Boolean(emailFormik.errors.email)
          }
          helperText={
            emailFormik.touched.email && emailFormik.errors.email
          }
        />
        <Button onClick={() => handleSave(userEmail)}>Save</Button>
      </div>
    </div>
  );
};

export default EditingTab;
