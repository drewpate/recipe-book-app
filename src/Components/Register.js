import React, { useState } from "react";
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

//creates account in firestore with email and password
const Register = () => {
  //initialize form states
  //TODO: try out useRef instead of state.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //bring in signup function from AuthContext
  const { signup } = useAuth();
  //assign and initialize useNavigate
  let navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    //simple validation
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
    } catch (error) {
      setError("Failed to create account");
      console.log(error);
    }
    setLoading(false);
    //if account was successfully created, direct user to create their first recipe
    navigate("/newrecipe");
  }

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card>
        <CardHeader title={`Register`} />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete="off"
            />
            <br />
            <br />
            <TextField
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-password-input"
              label="Password"
              autoComplete="off"
            />
            <br />
            <TextField
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="outlined-password-confirm-input"
              label="Confirm Password"
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
