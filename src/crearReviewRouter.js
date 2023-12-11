import express from 'express';
import * as crearReviewService from './crearElementoService.js';

const router = express.Router();


router.get('/detalle/:id', (req, res) => {
    // Lógica para renderizar la página detalle con todas las review
    res.render('detalle', { reviews: Array.from(crearReviewService.getAllReviews().values()) });

});


  
router.get('/detalle/:id', (req, res) => { 
    // Renderizar la página de creación de reviews
    res.render('detalle');

});
  

router.post('/detalle/:id', (req, res) => { 
  const newReview = crearReviewService.createReview(req.body);
  let recipe = crearReviewService.getRecipeById(req.params.id);
  let reviews;

if (typeof recipe === "undefined") {
  console.log('Receta NO encontrada');
}
else{
  

   console.log('Receta existe');
    reviews = crearReviewService.getReviews(recipe);
    reviews = crearReviewService.addReview(newReview, reviews);
    recipe.reviews = reviews;
    res.redirect(`/detalle/${req.params.id}`); 
  
 }
});


router.get('/detalle/:id', (req, res) => {
    //const review = crearReviewService.getReviewById(req.params.id);   ///VER ESTO
    console.log('Se ha buscado el objeto');
    if (!review) { //esta vacio
      res.status(404).send('Review no encontrado');
      console.log('El objeto no existe')
    } else {
      res.render('detalle', review); //colocalo en detalle
      console.log('Ha sido renderizado el objeto');
    }
});

router.post('/detalle/:id/delete', (req, res) => {
    const reviewId = req.params.id;
    const deleted = crearReviewService.deleteReviewById(reviewId); 
  
    if (!deleted) {
      res.status(404).send('Review no encontrado');
    } else {
      res.redirect('/detalle/:id');
    }
  });

  router.get('/detalle/:id', (req, res) => {
    // Supongamos que tu servicio tiene una función getRecipeById
    const receta = crearReviewService.getRecipeById(req.params.id);
  
    // Asegúrate de tener la función getStarRating en tu servicio
    const starRating = crearReviewService.getStarRating(receta.rate);
  
    // Pasar los datos a la plantilla
    const context = {
      receta: receta,
      starRating: starRating,
    };
  
    res.render('tu_plantilla', context);
  });
  

export default router;
