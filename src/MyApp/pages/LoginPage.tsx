import { api } from "../api/axios";
import { useState } from "react";
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
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginPage;
