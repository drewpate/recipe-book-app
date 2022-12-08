import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { v4 as uuidv4 } from "uuid";

//this component is used in the Recipes page
//takes in props to handle rendering the data from the recipes
//and the delete function
const RecipeCard = ({ recipe, handleDelete, handleOpenModal, getRecipe }) => {
  return (
    <Card>
      <CardHeader
        action={
          <CardActions>
            <IconButton onClick={() => handleDelete(recipe.id)}>
              <DeleteOutlined />
            </IconButton>
            <IconButton
              onClick={() => {
                handleOpenModal();
                getRecipe(recipe.id);
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
            <b>Amount:</b> {recipe.ingredients[index].amount}
          </Typography>
        ))}
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {recipe.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
