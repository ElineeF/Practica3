import express from 'express';
import * as crearElementoService from './crearElementoService.js';
import { getRecipes } from './crearElementoService.js';
import { getFavorites } from './crearElementoService.js';
const router = express.Router();

// router.get('/', (req, res) => {
//     // Lógica para renderizar la página principal con la lista de recetas
//     res.render('index', { recipes: crearElementoService.getAllRecipes() });
// });

// router.get('/', (req, res) => {

//   const favorites = getFavorites(0,4);

//   res.render('index', {
//     favorites: favorites
//   });

//   const recipes = getRecipes(0,3);

//   res.render('index', {
//     recipes: recipes
//   });
// });

router.get('/', (req, res) => {
  const favorites = getFavorites();
  const recipes = getRecipes(0, 3);

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

  const recipes = getRecipes(from,to); //const superheroes = getSuperheroes(from,to);

  res.render('recipes', {
      recipes: recipes
  });
});

router.get('/favorites', (req, res) => {

  const from = parseInt(req.query.from);
  const to = parseInt(req.query.to);

  const favorites = getFavorites(from,to); 

  res.render('favorites', {
      favorites: favorites
  });
});
  
router.post('/crearElemento', (req, res) => {
  const newData = req.body;

  if (newData.rcpName == "" || newData.rcpIngredients == ""|| newData.rcpDescription == "") {
    if(newData.rcpName == ""){
      return res.render('error', {
        error: 'El nombre no puede estar vacío. Por favor, completa el formulario.'
      });
    }
    if (newData.rcpIngredients == ""){
      return res.render('error', {
        error: 'Los ingredientes no pueden estar vacíos. Por favor, completa el formulario.'
      });
    }
    if (newData.rcpDescription == ""){
      return res.render('error', {
        error: 'La preparación de la receta no puede estar vacía. Por favor, completa el formulario.'
      });
    }
  } else {
    const newRecipe = crearElementoService.createRecipe(newData);
    res.redirect(`/detalle/${newRecipe.id}`);
  }
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

  if (newData.rcpName == "" || newData.rcpIngredients == ""|| newData.rcpDescription == "") {
    if(newData.rcpName == ""){
      return res.render('error', {
        error: 'El nombre no puede estar vacío. Por favor, completa el formulario.'
      });
    }
    if (newData.rcpIngredients == ""){
      return res.render('error', {
        error: 'Los ingredientes no pueden estar vacíos. Por favor, completa el formulario.'
      });
    }
    if (newData.rcpDescription == ""){
      return res.render('error', {
        error: 'La preparación de la receta no puede estar vacía. Por favor, completa el formulario.'
      });
    }
  } else {
    crearElementoService.updateRecipeById(targetRecipeId, newData);
    res.redirect(`/detalle/${targetRecipeId}`);
  }
})

export default router;