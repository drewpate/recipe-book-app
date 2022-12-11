import React, { useState, useEffect, useContext } from "react";

const RecipeContext = React.createContext();

export function useRecipeContext() {
  return useContext(RecipeContext);
}

export function RecipeContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRecipe, setCurrentRecipe] = useState([]);

  function getRecipe(id) {
    setIsLoading(true);
    setCurrentRecipe(id);
    setIsLoading(false);
  }

  useEffect(() => {
    getRecipe();
  }, []);

  const value = {
    isLoading,
    currentRecipe,
    getRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {!isLoading && children}
    </RecipeContext.Provider>
  );
}
