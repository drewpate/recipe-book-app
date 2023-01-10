import React from "react";
import { Dialog, Card, CardContent, Typography, Button } from "@mui/material";

function DeleteRecipeModal({
  open,
  selectedRecipe,
  handleDelete,
  handleCloseDelete,
}) {
  return (
    <Dialog open={open}>
      <Card>
        <CardContent>
          <Typography gutterBottom vairant="h5">
            Are you sure you want to delete
          </Typography>
          <Typography>
            This action is permanent and cannot be undone.
          </Typography>
          <Button onClick={() => handleDelete(selectedRecipe.id)}>
            Delete Recipe
          </Button>
          <Button onClick={handleCloseDelete}>Cancel</Button>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default DeleteRecipeModal;
