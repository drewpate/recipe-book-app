import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { auth } from "../firebase-config";
import { Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ButtonAppBar = () => {
  const { logout, currentUser } = useAuth();
  let navigate = useNavigate();

  async function handleLogOut() {
    try {
      await logout(auth);
    } catch {
      console.log("Log Out Failed!");
    }
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AutoStoriesIcon sx={{ padding: "10px", display: "flex" }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyRecipe Book
          </Typography>

          {currentUser ? (
            <Button color="secondary" onClick={handleLogOut}>
              Log Out
            </Button>
          ) : (
            <p>no user logged in</p>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
