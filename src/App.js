import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRecipeForm from "./Components/NewRecipeForm";
import Recipes from "./Components/Recipes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

const font = "'Lora', serif";

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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ body: { backgroundColor: "#188ffb" } }} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewRecipeForm />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/newrecipeform" element={<NewRecipeForm />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
