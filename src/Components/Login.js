import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Link,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";

import GoogleButton from "react-google-button";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    let emailInput = email;
    let passwordInput = password;

    if (emailInput && passwordInput === "") {
      setEmailError(true);
      setPasswordError(true);
    }

    if (emailInput === "") {
      setEmailError(true);
    }

    if (passwordInput === "") {
      setPasswordError(true);
    }

    if (emailInput && passwordInput) {
      setEmailError(false);
      setPassword(false);
      console.log("email and password received");
      navigate("/");
    }
  };

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card>
        <CardHeader title={`Login`} />
        <CardContent>
          <form
            className="form"
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            {emailError && (
              <Alert severity="error" sx={{ margin: "5px" }}>
                Please enter an email
              </Alert>
            )}
            <TextField
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete="off"
              error={emailError}
            />
            <br />
            <br />

            {passwordError && (
              <Alert severity="error" sx={{ margin: "5px" }}>
                Please enter a password
              </Alert>
            )}
            <TextField
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-password-input"
              label="Password"
              autoComplete="off"
              error={passwordError}
            />
            <br />
            <Button sx={{ margin: "5px" }} type="submit" variant="contained">
              Login
            </Button>
            <GoogleButton />
          </form>
          <CardContent>
            <Link>Forgot Password</Link>
          </CardContent>
          <CardContent>
            <Typography>Don't have an account?</Typography>
            <Link>Register</Link>
          </CardContent>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
