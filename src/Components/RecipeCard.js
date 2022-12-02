import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const RecipeCard = ({ recipe, handleDelete }) => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={() => handleDelete(recipe.id)}>
            <DeleteOutlined />
          </IconButton>
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
