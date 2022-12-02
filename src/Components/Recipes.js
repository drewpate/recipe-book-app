import React, { useEffect } from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import RecipeCard from "./RecipeCard";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRecipes();
  }, [recipesCollectionRef]);

  const handleDelete = async (id) => {
    const toDelete = doc(db, "recipes", id);
    await deleteDoc(toDelete);
  };

  return (
    <Container sx={{ marginTop: "10px" }} className="container">
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12}>
            <RecipeCard recipe={recipe} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Recipes;
