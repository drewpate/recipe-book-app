import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRecipeForm from "./Components/NewRecipeForm";
import Recipes from "./Components/Recipes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";

const font = "'Lora', serif";
const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#188ffb",
    },
  },
  typography: {
    fontFamily: font,
    allVariants: {
      color: "#188ffb",
    },
  },
});

const Navbar = () => {
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { backgroundColor: "#188ffb" } }} />
        <BrowserRouter>
          <Navbar />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
          />
          <Routes>
            <Route path="/" element={<NewRecipeForm />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
