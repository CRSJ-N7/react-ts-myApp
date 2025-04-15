import { api } from "../api/axios";
import { useState } from "react";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("auth/sign-up", { email, password, username });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", "true");
        localStorage.setItem("id", JSON.stringify(response.data.safeUser.id));
        localStorage.setItem("email", JSON.stringify(response.data.safeUser.email));
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.safeUser.username)
        );
        console.log(response.data.safeUser);
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
       type="text"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       placeholder="username"
     />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUpPage;