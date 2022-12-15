import React, { useEffect, useState } from "react";
import {
  Dialog,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function EditRecipeModal({ selectedRecipe, open, handleClose }) {
  const [modalInputFields, setModalInputFields] = useState({});

  useEffect(() => {
    setModalInputFields(selectedRecipe);
  }, [selectedRecipe]);

  const handleIngredientChange = (e, index) => {
    const updatedRecipe = { ...modalInputFields };
    updatedRecipe.ingredients[index][e.target.name] = e.target.value;

    setModalInputFields(updatedRecipe);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card sx={{ padding: "20px" }}>
        <CardContent>
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

            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Update Recipe</Button>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default EditRecipeModal;
