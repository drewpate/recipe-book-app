import React, { useEffect, useState } from "react";
import {
  Dialog,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
function EditRecipeModal({ selectedRecipe, open, handleClose }) {
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

  const handleUpdate = () => {
    let id = selectedRecipe.id;
    const docRef = doc(db, "recipes", id);
    console.log(docRef);
    updateDoc(docRef, { ...modalInputFields });
    handleClose();
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
              margin="dense"
              id="title"
              type="text"
              placeholder="Edit Title"
              label={modalInputFields.title}
              vlaue={modalInputFields.title}
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
              </div>
            ))}
            <Typography>Instructions</Typography>
            <TextField
              margin="dense"
              id="details"
              label={modalInputFields.instructions}
              multilinerows="10"
              type="text"
              fullWidth
              variant="standard"
            />

            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Recipe</Button>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default EditRecipeModal;
