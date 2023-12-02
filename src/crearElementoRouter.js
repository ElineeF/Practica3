import express from 'express';
import * as crearElementoService from './crearElementoService.js';

const router = express.Router();

/*router.post('/nuevaReceta', (req, res) => {

    res.render('receta', {
        image: req.body.image,
        rcpName: req.body.rcpName,
        rcpIngredients: req.body.rcpIngredients,
        rcpDescription: req.body.rcpDescription,
        lactose: req.body.lactose,
        egg: req.body.egg,
        nuts: req.body.nuts,
        soya: req.body.soya,
        seafood: req.body.seafood,
        fish: req.body.fish,
        dietRestrictions: req.body.dietRestrictions,
        celiac: req.body.celiac
    });
});*/


router.get('/', (req, res) => {
    // Lógica para renderizar la página principal con la lista de recetas
    res.render('index', { recipes: crearElementoService.getAllRecipes() });
});
  
router.get('/crearElemento', (req, res) => {
    // Renderizar la página de creación de recetas
    res.render('crearElemento');
});
  
router.post('/crearElemento', (req, res) => {
    // Lógica para procesar el formulario y crear una nueva receta
    const newRecipe = crearElementoService.createRecipe(req.body);
    res.redirect(`/detalle/${newRecipe.id}`);
});
  
router.get('/detalle/:id', (req, res) => {
    // Lógica para renderizar la página de detalle de una receta por su ID
    const recipe = crearElementoService.getRecipeById(req.params.id);
    if (!recipe) {
      res.status(404).send('Receta no encontrada');
    } else {
      res.render('detalle', { recipe });
    }
});

router.post('/detalle/:id/delete', (req, res) => {
    const recipeId = req.params.id;
    const deleted = crearElementoService.deleteRecipeById(recipeId);
  
    if (!deleted) {
      res.status(404).send('Receta no encontrada');
    } else {
      res.redirect('/');
    }
  });

export default router;
