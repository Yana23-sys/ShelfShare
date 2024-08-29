"use client";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import styles from "../Styles/Login.module.css";
import Link from "next/link";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

function Login({ users }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleLogin = (user) => {
    setUser(user);
    console.log(user.username);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h2" variant="h5">
          Enter your credentials to login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>

      <Typography component="h2" variant="h5" style={{ margin: "2rem" }}>
        Or click on an existing user profile to test some functionalities
      </Typography>
      <section className={styles.userButtonsContainer}>
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => handleLogin(user)}
            className={styles.userLoginButton}
          >
            <Link href="/" prefetch={false}>
              {user.username}
              <img src={user.avatar} />
            </Link>
          </button>
        ))}
      </section>
    </div>
  );
}

export default Login;
