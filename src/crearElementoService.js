const recipes = [];

export function createRecipe(recipeData) {
  // Lógica para validar y guardar la nueva receta
  const newRecipe = {
    id: recipes.length + 1,
    rcpName: recipeData.rcpName,
    rcpImage: recipeData.rcpImage,
    rcpIngredients: recipeData.rcpIngredients.split('\n').map(line => line.trim()),
    rcpDescription: recipeData.rcpDescription,
    lactose: recipeData.lactose === 'on',
    nuts: recipeData.nuts === 'on',
    soya: recipeData.soya === 'on',
    seafood: recipeData.seafood === 'on',
    fish: recipeData.fish === 'on',
    dietRestrictions: recipeData.dietRestrictions,
  };

  recipes.push(newRecipe);
  return newRecipe;
}

export function getRecipeById(recipeId) {
  // Lógica para obtener una receta por su ID
  const recipe = recipes.find(recipe => recipe.id === Number(recipeId));

  if (recipe) {
    recipe.showDietRestriction = recipe.dietRestrictions !== null;
  }

  return recipe;
}


export function getAllRecipes() {
    return recipes;
  }

export function deleteRecipeById(recipeId) {
    const index = recipes.findIndex(recipe => recipe.id === Number(recipeId));
    if (index !== -1) {
      recipes.splice(index, 1);
      return true; // receta eliminada 
    }
    return false; // receta no encontrada
  }