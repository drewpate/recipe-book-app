import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NewRecipeForm from "./Components/NewRecipeForm";
import Recipes from "./Components/Recipes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MyDrawer from "./Components/MyDrawer";
import ButtonAppBar from "./Components/ButtonAppBar";
import Register from "./Components/Register";
const font = "'Roboto', sans-serif";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: font,
    fontSize: 24,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
        <MyDrawer />

        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/newrecipe" element={<NewRecipeForm />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
