import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ButtonAppBar = () => {
  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

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
            <button onClick={handleLogOut}>Log Out</button>
          ) : (
            <p>no user logged in</p>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
