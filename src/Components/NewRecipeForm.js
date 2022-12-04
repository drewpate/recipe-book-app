import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, CardContent, Typography, IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const NewRecipeForm = () => {
  // assign useNavigate hook to variable to be used when the user needs to be directed to another page
  let navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    title: "",
    details: "",
    ingredients: [],
  });

  //initialize states
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [ingredeientsError, setIngredientsError] = useState(false);
  //creates a collection reference and target the collection in firestore
  const postCollectionRef = collection(db, "recipes");

  //handles posting the new recipe to firestore
  const createRecipe = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setIngredientsError(false);

    //assigned the state values to variables to make them easier to work with for validation below
    let title = inputFields.title;
    let details = inputFields.details;
    let ingredients = inputFields.ingredients;

    //just some validation
    //TODO: try to store this in a variable elsewhere and bring it in to make this look a bit cleaner
    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (ingredients === "") {
      setIngredientsError(true);
    }
    //adds the recipe to firestore
    await addDoc(postCollectionRef, {
      title,
      details,
      ingredients,
      author: auth.currentUser.email,
      author_id: auth.currentUser.uid,
    });
    //here's where useNavigate does it's thing and directs user to the homepage
    navigate("/");
  };

  //this will allow the user to dynamically add ingredients to the form
  const addIngredient = () => {
    const newIngredient = {
      ingredient: "",
      amount: "",
    };
    //set the inputFields to all the previous values and include the new ones
    setInputFields({
      ...inputFields,
      ingredients: [...inputFields.ingredients, newIngredient],
    });
  };
  //user can remove the fields dynamically if they change their mind
  //or added more than intended
  const removeFields = (index) => {
    let data = { ...inputFields };
    data.ingredients.splice(index, 1);
    setInputFields({ ...inputFields });
  };
  //handles change for the ingredients
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
  //handles the changes for the other fields since they don't need to be dynamic
  //TODO see if it might make things simpler to store these in a ref since we don't really need statet
  //to track these until user submits?
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
            onSubmit={createRecipe}
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
