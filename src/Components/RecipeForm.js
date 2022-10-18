import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { FormControlLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("Year Round");

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch("http://localhost:8000/recipes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => navigate("/recipes"));
    }
  };

  return (
    <Container className="container">
      <Card sx={{ width: "50%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Create a Recipe
          </Typography>
          <form
            className="form"
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <TextField
              label="Title"
              id="outlined-basic"
              name="Title"
              variant="outlined"
              required
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <TextField
              label="Details"
              id="outlined-basic"
              name="Details"
              variant="outlined"
              multiline
              rows={4}
              required
              error={detailsError}
              onChange={(e) => setDetails(e.target.value)}
            />
            <br />
            <br />
            <FormControl>
              <FormLabel>Category</FormLabel>
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <FormControlLabel
                  value="Year Round"
                  control={<Radio />}
                  label="Year Round"
                />
                <FormControlLabel
                  value="Seasonal"
                  control={<Radio />}
                  label="Seasonal"
                />
              </RadioGroup>
              <br />
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RecipeForm;
