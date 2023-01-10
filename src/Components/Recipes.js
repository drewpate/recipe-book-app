import React, { useEffect } from "react";
import { useState } from "react";
import { Grid, Container } from "@mui/material";
import RecipeCard from "./RecipeCard";
import EditRecipeModal from "./EditRecipeModal";
import DeleteRecipeModal from "./DeleteRecipeModal";
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
  //set fire store collection ref variable and target the collection
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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

  //state setters for opening and closing the modal
  const handleOpenEdit = (id) => {
    const editRecipeSelector = recipes.find((recipe) => recipe.id === id);
    setSelectedRecipe(editRecipeSelector);
    setOpen(!open);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  const handleOpenDelete = (id) => {
    const deleteRecipeSelector = recipes.find((recipe) => recipe.id === id);
    setSelectedRecipe(deleteRecipeSelector);
    setOpenDelete(!open);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //delete one recipe from firestore
  //TODO add an "are you sure?" option
  const handleDelete = async (id) => {
    const docToDelete = doc(db, "recipes", id);
    await deleteDoc(docToDelete);
    handleCloseDelete(!open);
  };

  return (
    <>
      <DeleteRecipeModal
        open={openDelete}
        handleCloseDelete={handleCloseDelete}
        onClose
        selectedRecipe={selectedRecipe}
        handleDelete={handleDelete}
      />
      <EditRecipeModal
        open={open}
        handleCloseEdit={handleCloseEdit}
        onClose
        selectedRecipe={selectedRecipe}
      />
      <Container sx={{ marginTop: "10px" }} className="container">
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12}>
              <RecipeCard
                recipe={recipe}
                handleCloseEdit={handleCloseEdit}
                handleOpenEdit={handleOpenEdit}
                handleOpenDelete={handleOpenDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Recipes;
