import React, { useEffect, useState } from "react";
import {
  Dialog,
  Typography,
  TextField,
  Button,
  Grid,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
function EditRecipeModal({ selectedRecipe, open, handleCloseEdit }) {
  const [modalInputFields, setModalInputFields] = useState({});

  useEffect(() => {
    setModalInputFields(selectedRecipe);
  }, [selectedRecipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalInputFields({
      ...modalInputFields,
      [name]: value,
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedRecipe = { ...modalInputFields };
    updatedRecipe.ingredients[index][e.target.name] = e.target.value;

    setModalInputFields(updatedRecipe);
  };

  const handleUpdate = async () => {
    let id = selectedRecipe.id;
    const docRef = doc(db, "recipes", id);
    console.log(docRef);
    try {
      await updateDoc(docRef, { ...modalInputFields });
      handleCloseEdit();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog
      sx={{
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        overflowY: "scroll",
      }}
      open={open}
      onClose={handleCloseEdit}
    >
      <DialogContent>
        <Typography gutterBottom variant="h5">
          {selectedRecipe.title}
        </Typography>
        <form>
          <TextField
            name="title"
            margin="dense"
            id="title"
            type="text"
            placeholder="Edit Title"
            label={modalInputFields.title}
            value={modalInputFields.title}
            onChange={(e) => handleChange(e)}
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
                label="Ingredient"
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
                label="Amount"
                onChange={(e) => handleIngredientChange(e, index)}
                fullWidth
              />
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
            </div>
          ))}
          <Typography>Instructions</Typography>
          <TextField
            margin="dense"
            id="details"
            name="instructions"
            value={modalInputFields.instructions}
            multiline
            rows={4}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </form>
      </DialogContent>
      <Grid item>
        <Button
          variant="contained"
          sx={{ margin: "5px" }}
          onClick={handleCloseEdit}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "5px" }}
          onClick={handleUpdate}
        >
          Update Recipe
        </Button>
      </Grid>
    </Dialog>
  );
}

export default EditRecipeModal;
