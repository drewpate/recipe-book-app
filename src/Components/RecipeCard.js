import React from "react";
import Card from "@mui/material/Card";
import {
  IconButton,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { v4 as uuidv4 } from "uuid";

//this component is used in the Recipes page
//takes in props to handle rendering the data from the recipes
//and the delete function
const RecipeCard = ({ recipe, handleOpenEdit, handleOpenDelete }) => {
  return (
    <Card>
      <CardHeader
        action={
          <CardActions>
            <IconButton onClick={() => handleOpenDelete(recipe.id)}>
              <DeleteOutlined />
            </IconButton>
            <IconButton
              onClick={() => {
                handleOpenEdit(recipe.id);
              }}
            >
              <EditIcon />
            </IconButton>
          </CardActions>
        }
        title={recipe.title}
      />
      <CardContent>
        {recipe.ingredients?.map((ingredient, index) => (
          <Typography key={uuidv4()} variant="body2" color="textSecondary">
            <b>Ingredient:</b> {recipe.ingredients[index].ingredient}
            <br />
            <b>- Amount:</b> {recipe.ingredients[index].amount}
            <br />
            <b>- Unit:</b> {recipe.ingredients[index].unit}
          </Typography>
        ))}
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {recipe.instructions}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
