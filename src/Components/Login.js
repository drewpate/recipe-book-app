import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Alert from "@mui/material/Alert";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Link,
  FormControl,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";

import GoogleButton from "react-google-button";

const Login = () => {
  //initialize state
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, googleSignIn } = useAuth();
  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //assign and initialize useNavigate

  async function submitHandler(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      navigate("/newrecipe");
    } catch (error) {
      console.log(error.message);
      setError("Login Failed: Incorrect Email or Password");
      setLoading(false);
    }
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn();
      setLoading(false);
      navigate("/newrecipe");
    } catch (error) {
      console.log(error.message);
      setError("Login Failed");
      setLoading(false);
    }
  }

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
            {error && (
              <Alert severity="error" sx={{ margin: "5px" }}>
                {error}
              </Alert>
            )}
            <FormControl sx={{ m: 1, minWidth: 120 }} disabled>
              <TextField
                required
                type="email"
                inputRef={emailRef}
                placeholder="Email Address"
                autoComplete="off"
              />
              <br />
              <br />
              <TextField
                required
                type="password"
                inputRef={passwordRef}
                id="outlined-password-input"
                label="Password"
                autoComplete="off"
              />
            </FormControl>
            <br />
            <Button
              sx={{ margin: "5px" }}
              disabled={loading}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
          <GoogleButton onClick={handleGoogleSignIn} />
          <CardContent>
            <Link>Forgot Password</Link>
          </CardContent>
          <CardContent>
            <Typography>Don't have an account?</Typography>
            <Link href="/register">Register</Link>
          </CardContent>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
