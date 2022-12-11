import React, { useState } from "react";
import { Backdrop, Card, Typography, TextField, Button } from "@mui/material";

function EditRecipeModal({ oneRecipe, open, handleCloseModal }) {
  const [modalInputFields, setModalInputFields] = useState({
    title: oneRecipe.title,
    ingredients: oneRecipe.ingredients,
    details: oneRecipe.details,
  });

  const handleIngredientChange = (e, index) => {
    const updatedRecipe = { ...modalInputFields };
    updatedRecipe.ingredients[index][e.target.name] = e.target.value;

    setModalInputFields(updatedRecipe);
  };

  return (
    <Backdrop open={open} onClose={handleCloseModal}>
      <Card sx={{ padding: "20px" }}>
        <Typography gutterBottom variant="h5">
          {modalInputFields.title}
        </Typography>
        <form>
          <TextField
            name="title"
            id="title"
            placeholder="Edit Title"
            sx={{ padding: "10px" }}
          />
          <Typography>Ingredients</Typography>
          {modalInputFields?.ingredients?.map((ingredient, index) => (
            <div key={index}>
              <TextField
                key={ingredient.id}
                name="ingredient"
                id={ingredient.id}
                value={ingredient.ingredient}
                placeholder="new ingredient"
                onChange={(e) => handleIngredientChange(e, index)}
                fullWidth
                type="text"
                sx={{ padding: "10px" }}
              />
              <TextField
                key={ingredient.id}
                sx={{ padding: "10px" }}
                name="amount"
                id={ingredient.amount}
                value={ingredient.amount}
                placeholder="new amount"
                onChange={(e) => handleIngredientChange(e, index)}
                fullWidth
              />
            </div>
          ))}
          <Typography>Details</Typography>
          <TextField
            margin="dense"
            id="details"
            label={modalInputFields.details}
            multilinerows="10"
            type="text"
            fullWidth
            variant="standard"
          />

          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleCloseModal}>Update Recipe</Button>
        </form>
      </Card>
    </Backdrop>
  );
}

export default EditRecipeModal;
