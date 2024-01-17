import express from 'express';
import * as crearElementoService from './crearElementoService.js';
import { getRecipes } from './crearElementoService.js';
import { getFavorites } from './crearElementoService.js';
import { deleteFavorite } from './crearElementoService.js';
const router = express.Router();


router.get('/', (req, res) => {
  const favorites = getFavorites();
  const recipes = getRecipes(0, 3);
  console.log(recipes);
  console.log(favorites);
  res.render('index', {
    favorites: favorites,
    recipes: recipes
  });
});


  
router.get('/crearElemento', (req, res) => {
    // Renderizar la página de creación de recetas
  res.render('crearElemento');
});


router.get('/recipes', (req, res) => {

  const from = parseInt(req.query.from);
  const to = parseInt(req.query.to);

  const recipes = getRecipes(from,to); 

  res.render('recipes', {
      recipes: recipes
  });
});

router.get('/favorites', (req, res) => {

  const favorites = getFavorites(); 

  res.render('favorites', {
      favorites: favorites
  });
});

router.get('/cogerFavoritos', (req, res) =>{
  res.json({favorites: getFavorites()})
});
  
router.post('/crearElemento', (req, res) => {
  const newData = req.body;
  const newRecipe = crearElementoService.createRecipe(newData);
  res.redirect(`/detalle/${newRecipe.id}`);
});

router.get('/detalle/:id', (req, res) => {
    // renderizar la página de detalle de una receta por su ID
    let recipe = crearElementoService.getRecipeById(req.params.id);
    if (!recipe) {
      res.status(404).send('Receta no encontrada');
    } else {
      res.render('detalle', recipe);
    }
});

//borrar

router.post('/detalle/:id/delete', (req, res) => {
  const recipeId = req.params.id;
  try {
    crearElementoService.deleteRecipeById(recipeId);
    res.redirect('/');
  } catch (error) {
    console.error('Error al eliminar la receta:', error.message);
    res.status(404).send('Receta no encontrada');
  }
});


//editar
router.get('/editar/:id', (req, res) => {
  const recipe = crearElementoService.getRecipeById(req.params.id);
  if(!recipe){
    res.status(404).send('Receta no encontrada');
  } else {
    res.render('crearElemento', recipe);
  }
})

router.post('/editar/:id', (req, res) => {
  const targetRecipeId = req.params.id;
  const newData = req.body;
  crearElementoService.updateRecipeById(targetRecipeId, newData);
  res.redirect(`/detalle/${targetRecipeId}`);
})

router.post('/updateFavorite', (req, res) => {
  const { id, isFavorite } = req.body;

  try {
      if (isFavorite) {
          // Si se marca como favorita
          addFavorite(getRecipeById(id)); 
      } else {
          // Si se desmarca como favorita
          deleteFavorite(id);
      }
      res.json({ message: 'Receta actualizada con éxito' });
  } catch (error) {
      console.error(error);
      res.status(500).send('Ocurrió un error al actualizar la receta');
  }
});

export default router;