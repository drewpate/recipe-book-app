import React, { useEffect } from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import RecipeCard from "./RecipeCard";
import EditRecipeModal from "./EditRecipeModal";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Recipes = () => {
  //initialize state to empty array
  //set fire store collection ref variable and target the collection
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);

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

  //delete one recipe from firestore
  //TODO add an "are you sure?" option
  const handleDelete = async (id) => {
    const toDelete = doc(db, "recipes", id);
    await deleteDoc(toDelete);
  };

  return (
    <>
      <EditRecipeModal open={open} onClose={handleCloseModal} />
      <Container sx={{ marginTop: "10px" }} className="container">
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12}>
              <RecipeCard
                recipe={recipe}
                handleDelete={handleDelete}
                handleOpenModal={handleOpenModal}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Recipes;
