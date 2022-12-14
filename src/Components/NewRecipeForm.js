import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Grid,
  CardContent,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const NewRecipeForm = () => {
  // assign useNavigate hook to variable to be used when the user needs to be directed to another page
  let navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    title: "",
    instructions: "",
    ingredients: [
      {
        ingredient: "",
        amount: "",
        unit: "",
      },
    ],
  });

  //initialize states
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //creates a collection reference and target the collection in firestore
  const postCollectionRef = collection(db, "recipes");

  //handles posting the new recipe to firestore
  const createRecipe = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    let title = inputFields.title;
    let ingredients = inputFields.ingredients;
    let instructions = inputFields.instructions;

    if (title === "") {
      return setErrorMessage("Please enter a title");
    }

    if (ingredients.length === 0) {
      return setErrorMessage(
        "At least one ingredient, amount, and unit required"
      );
    }

    if (ingredients.some(({ ingredient }) => ingredient === "")) {
      return setErrorMessage("Please fill or remove empty ingredient fields");
    }

    if (ingredients.some(({ amount, unit }) => amount === "" || unit === "")) {
      return setErrorMessage("Amount and Unit fields are required");
    }

    if (instructions === "") {
      return setErrorMessage("Please fill out instructions");
    }

    try {
      setErrorMessage("");
      setLoading(true);
      //adds the recipe to firestore
      await addDoc(postCollectionRef, {
        title,
        ingredients,
        instructions,
        author: auth.currentUser.email,
        author_id: auth.currentUser.uid,
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Failed to create recipe");
    }
    navigate("/recipes");
  };

  //this will allow the user to dynamically add ingredients to the form
  const addIngredient = () => {
    const newIngredient = {
      ingredient: "",
      amount: "",
      unit: "",
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
    setErrorMessage("");
    const updatedIngredients = { ...inputFields };
    updatedIngredients.ingredients[index][e.target.name] = e.target.value;
    setInputFields(updatedIngredients);
  };
  //handles the changes for the other fields since they don't need to be dynamic
  //TODO see if it might make things simpler to store these in a ref since we don't really need statet
  //to track these until user submits?
  const handleChange = (e) => {
    setErrorMessage("");
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
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Create A Recipe
          </Typography>
          <form
            noValidate
            className="form"
            autoComplete="off"
            onSubmit={createRecipe}
          >
            {errorMessage && (
              <Alert severity="error" sx={{ margin: "5px" }}>
                {errorMessage}
              </Alert>
            )}
            <TextField
              value={inputFields.title}
              name="title"
              id="title"
              label="Title"
              onChange={handleChange}
              sx={{ paddingBottom: "10px" }}
              fullWidth
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
                    <Grid item xs={12}>
                      <TextField
                        name="ingredient"
                        id="ingredient"
                        margin="normal"
                        label="Ingredient"
                        value={ingredient.ingredient}
                        onChange={(e) => handleIngredientChange(e, index)}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="amount"
                        id="amount"
                        margin="normal"
                        label="Amount"
                        type="number"
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(e, index)}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Unit</InputLabel>
                        <Select
                          value={ingredient.unit}
                          label="Unit"
                          name="unit"
                          id="unit"
                          onChange={(e) => handleIngredientChange(e, index)}
                          required
                        >
                          <MenuItem name="Cup" value="Cup">
                            Cup
                          </MenuItem>
                          <MenuItem name="Ounces" value="Ounces">
                            Ounces
                          </MenuItem>
                          <MenuItem name="Lbs" value="Lbs">
                            Lbs
                          </MenuItem>
                          <MenuItem name="Grams" value="Grams">
                            Grams
                          </MenuItem>
                          <MenuItem name="Tbsp" value="Tbsp">
                            Tbsp
                          </MenuItem>
                          <MenuItem name="Tsp" value="Tsp">
                            Tsp
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs>
                      <IconButton onClick={() => removeFields(index)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              );
            })}

            <TextField
              label="Instructions"
              id="outlined-basic"
              name="instructions"
              value={inputFields.instructions}
              variant="outlined"
              multiline
              rows={4}
              onChange={handleChange}
              sx={{ paddingBottom: "10px" }}
            >
              Details
            </TextField>

            <Button
              sx={{ margin: "5px" }}
              variant="contained"
              color="primary"
              onClick={addIngredient}
              disabled={loading}
            >
              Add more ingredients
            </Button>
            <Button
              sx={{ margin: "5px" }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
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
