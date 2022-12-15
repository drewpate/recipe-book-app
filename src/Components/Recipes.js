import React, { useEffect } from "react";
import { useState } from "react";
import { Grid, Container } from "@mui/material";
import RecipeCard from "./RecipeCard";
import EditRecipeModal from "./EditRecipeModal";
import {
  collection,
  deleteDoc,
  getDocs,
  // updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Recipes = () => {
  //set fire store collection ref variable and target the collection
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const recipesCollectionRef = collection(db, "recipes");

  //get recipes from firestore
  //will only get docs that were made by the logged in user
  useEffect(() => {
    const getRecipes = async () => {
      const q = query(
        recipesCollectionRef,
        where("author_id", "==", auth.currentUser.uid)
      );
      const querySnapShot = await getDocs(q);
      setRecipes(
        querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getRecipes();
  }, [recipesCollectionRef]);

  //initialize state for the moodal

  //state setters for opening and closing the modal
  const handleOpen = (id) => {
    const editRecipeSelector = recipes.find((recipe) => recipe.id === id);
    setSelectedRecipe(editRecipeSelector);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //delete one recipe from firestore
  //TODO add an "are you sure?" option
  const handleDelete = async (id) => {
    const docToDelete = doc(db, "recipes", id);
    await deleteDoc(docToDelete);
  };

  // const handleUpdate = async (id) => {
  //   const docToUpdate = doc(db, "recipes", id);
  //   await updateDoc(docToUpdate, {
  //   });
  // }
  return (
    <>
      <EditRecipeModal
        open={open}
        handleClose={handleClose}
        onClose
        selectedRecipe={selectedRecipe}
      />
      <Container sx={{ marginTop: "10px" }} className="container">
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12}>
              <RecipeCard
                recipe={recipe}
                handleDelete={handleDelete}
                handleClose={handleClose}
                handleOpen={handleOpen}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Recipes;
