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
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/newrecipe");
    } catch {
      setError("Invalid credentials");
    }
    // navigate("/");
    setLoading(false);
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
            <br />
            <Button
              sx={{ margin: "5px" }}
              disabled={loading}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </form>
          <CardContent>
            <Typography>Already have an account?</Typography>
            <Link href="/login">Login</Link>
          </CardContent>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
