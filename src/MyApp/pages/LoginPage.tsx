import { Button, TextField } from "@mui/material";
import { api } from "../api/axios";
import { useState } from "react";
import { customButton } from "../styles/buttons";
import { customForm } from "../styles/forms";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("auth/sign-in", { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", JSON.stringify(response.data.user.id));
        localStorage.setItem("email", JSON.stringify(response.data.user.email));
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user.username)
        );
        localStorage.setItem("auth", "true");
        console.log(response.data.user);
        window.location.href = "/profile";
      }
    } catch (error) {
      localStorage.clear();
      localStorage.setItem("auth", "false");
      console.log(error);
    }
  };

  return localStorage.getItem("auth") === "true" ? null : (
    <form onSubmit={handleSubmit}>
      <TextField
        type="email"
        label="email"
        sx={customForm.root}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        sx={customForm.root}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="password"
      />
      <Button variant="outlined" type="submit" sx={customButton.root}>
        Submit
      </Button>
    </form>
  );
};

export default LoginPage;
