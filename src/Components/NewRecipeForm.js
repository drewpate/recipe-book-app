import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, CardContent, Typography, IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NewRecipeForm = () => {
  let navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    title: "",
    details: "",
    ingredients: [],
  });

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [ingredeientsError, setIngredientsError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setIngredientsError(false);

    let title = inputFields.title;
    let details = inputFields.details;
    let ingredients = inputFields.ingredients;
    console.log(ingredients);

    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (ingredients === "") {
      setIngredientsError(true);
    }
    if (title && details) {
      fetch("http://localhost:8000/recipes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          ingredients,
        }),
      }).then(() => navigate("/recipes"));
    }
  };

  const addIngredient = () => {
    const newIngredient = {
      ingredient: "",
      amount: "",
    };

    setInputFields({
      ...inputFields,
      ingredients: [...inputFields.ingredients, newIngredient],
    });
  };

  const removeFields = (index) => {
    let data = { ...inputFields };
    data.ingredients.splice(index, 1);
    setInputFields({ ...inputFields });
    // let data = {...inputFields};
    // data.splice(index, 1);
    // setInputFields({data});
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;

    const field = name.split("-")[0];

    const updatedIngredients = inputFields.ingredients.map((ingredient, i) => {
      return i === index ? { ...ingredient, [field]: value } : ingredient;
    });

    setInputFields({
      ...inputFields,
      ingredients: updatedIngredients,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card sx={{ width: "50%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Create A Recipe
          </Typography>
          <form
            className="form"
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <TextField
              value={inputFields.name}
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleChange}
              error={titleError}
              sx={{ paddingBottom: "10px" }}
              required
            />
            {inputFields.ingredients.map((ingredient, index) => {
              return (
                <div key={index}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={5}>
                      <TextField
                        name={"ingredient-" + (index + 1)}
                        id={"ingredient-" + (index + 1)}
                        margin="normal"
                        placeholder="ingredient"
                        value={ingredient.ingredient}
                        error={ingredeientsError}
                        onChange={(e) => handleIngredientChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        name={"amount-ingredient-" + index + 1}
                        id={"amount-ingredient-" + index + 1}
                        margin="normal"
                        placeholder="amount"
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => removeFields(index)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              );
            })}

            <TextField
              label="Details"
              id="outlined-basic"
              name="details"
              value={inputFields.details}
              variant="outlined"
              multiline
              rows={4}
              onChange={handleChange}
              error={detailsError}
              sx={{ paddingBottom: "10px" }}
              required
            >
              Details
            </TextField>

            <Button
              sx={{ margin: "5px" }}
              variant="contained"
              color="primary"
              onClick={addIngredient}
            >
              Add more ingredients
            </Button>
            <Button
              sx={{ margin: "5px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewRecipeForm;
