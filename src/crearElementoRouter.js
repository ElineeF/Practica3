import express from 'express';
import * as crearElementoService from './crearElementoService.js';



const router = express.Router();


router.get('/', (req, res) => {
    // Lógica para renderizar la página principal con la lista de recetas
    res.render('index', { recipes: crearElementoService.getAllRecipes() });
   // console.log(crearElementoService.getRecipeById(0));
  });
  
  router.get('/crearElemento', (req, res) => {
    // Renderizar la página de creación de recetas
    res.render('crearElemento');
});
  
router.post('/crearElemento', (req, res) => {
  let newRecipe = crearElementoService.createRecipe(req.body);
  let recipes = crearElementoService.getAllRecipes;
  recipes = crearElementoService.addRecipe(newRecipe);
  console.log('ID NUEVO DE RECETA', recipes.length);

  console.log(newRecipe);
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

/*router.post('/editar/:id', (req, res) => {
  const targetRecipeId = req.params.id;
  const newData = req.body;
  const updatedRecipe = crearElementoService.updateRecipeById(targetRecipeId, newData);

  if (updatedRecipe) {
    res.redirect(`/detalle/${targetRecipeId}`);
  } else {
    res.status(404).send('Receta no encontrada');
  }
})*/

router.post('/editar/:id', (req, res) => {
  const targetRecipeId = req.params.id;
  crearElementoService.updateRecipeById(targetRecipeId, req.body);

  res.redirect(`/detalle/${targetRecipeId}`);
})

export default router;