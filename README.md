# Recipe Book App

This is a personal project for a Recipe Book. The idea originally came about while working in a cafe. We needed a flexible way to store the recipes for drink syrups. The idea is to be able to create a card for your home recipes and save them.

![Screen shot of Create Recipe in the App UI](https://github.com/drewpate/recipe-book-app/blob/main/images/new-recipe-ss.png)

## Tech Stack

React
Material UI
Google Firebase and Firestore

### Dynamic Forms and Cards

Since every recipe can be different, the recipe forms--and the card components used to display the recipes--needed to be flexible and dynamic.

![Screen shot of a Recipe Card in the App UI](https://github.com/drewpate/recipe-book-app/blob/main/images/all-rercipes-ss.png)

### Editing

No CRUD application would be complete with out the U (update) feature. Clicking the pencil icon allows the user to open a modal that rertrieves the data from the selected recipe, auto-fill all fields with that data, and change details about the recipe. Thanks to the power and functionality of Firestore, updates are super fast.

![Screen shot of the Edit Recipe Modal in the App UI](https://github.com/drewpate/recipe-book-app/blob/main/images/edit-rercipe-modal-ss.png)

## Road Map

The is the first release of the app. In the future users will be able ot share recipes with each other, like and favorite recipes, and add images. Further along, I'd like to see an API to integrate with Instacart or a grocery service to help gather ingredients.
