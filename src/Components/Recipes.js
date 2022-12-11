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
  // updateDoc,
  getDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Recipes = () => {
  //initialize state to empty array
  //set fire store collection ref variable and target the collection
  const [recipes, setRecipes] = useState([]);
  const [oneRecipe, setOneRecipe] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  //initialize state for the moodal
  const [open, setOpen] = useState(false);

  //state setters for opening and closing the modal
  const handleCloseModal = () => setOpen(false);
  const handleToggle = () => setOpen(!open);

  //get one recipe
  const getRecipe = async (id) => {
    console.log("get recipe fired");
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setOneRecipe(docSnap.data());
    } else {
      console.log("failed to get document!");
    }
  };

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
        oneRecipe={oneRecipe}
        handleCloseModal={handleCloseModal}
      />
      <Container sx={{ marginTop: "10px" }} className="container">
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12}>
              <RecipeCard
                recipe={recipe}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
                getRecipe={getRecipe}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Recipes;
