import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase-config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card>
        <CardHeader title={`Login`} />
        <CardContent>
          <TextField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button onClick={() => signInWithEmailAndPassword(email, password)}>
            Login
          </Button>
          <GoogleButton onClick={signInWithGoogle} />
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
}

export default Login;
