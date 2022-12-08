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
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>{oneRecipe.title}</DialogTitle>
      <TextField name="title" id="title" sx={{ padding: "10px" }} />
      <DialogContent>
        <DialogContentText>Ingredients</DialogContentText>
        {oneRecipe.ingredients?.map((ingredient, index) => (
          <TextField
            key={uuidv4()}
            margin="dense"
            id={"ingredients"}
            placeholder={oneRecipe.ingredients[index].ingredient}
            type="text"
            fullWidth
            variant="standard"
          />
        ))}
        <DialogContentText>Details</DialogContentText>
        <TextField
          margin="dense"
          id="details"
          label={oneRecipe.details}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleCloseModal}>Update Recipe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditRecipeModal;
