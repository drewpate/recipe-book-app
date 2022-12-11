import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function EditRecipeModal({ oneRecipe, open, handleCloseModal }) {
  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="lg">
      <DialogTitle>{oneRecipe.title}</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          id="title"
          placeholder="Title"
          sx={{ padding: "10px" }}
        />
        <DialogContentText>Ingredients</DialogContentText>
        {oneRecipe.ingredients?.map((ingredient, index) => (
          <div key={index}>
            <TextField
              key={uuidv4()}
              name="ingredients"
              id={oneRecipe.ingredients[index].ingredient}
              placeholder="new ingredient"
              fullWidth
              type="text"
              sx={{ padding: "10px" }}
            />
            <TextField
              key={uuidv4()}
              sx={{ padding: "10px" }}
              name="Amount"
              id={oneRecipe.ingredients[index].amount}
              placeholder={oneRecipe.ingredients[index].amount}
              fullWidth
            />
          </div>
        ))}
        <DialogContentText>Details</DialogContentText>
        <TextField
          margin="dense"
          id="details"
          label={oneRecipe.details}
          multilinerows="10"
          type="text"
          fullWidth
          variant="standard"
        />
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleCloseModal}>Update Recipe</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default EditRecipeModal;
