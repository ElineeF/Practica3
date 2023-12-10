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
  
// router.post('/detalle/:id', (req, res) => { 
//   console.log('Datos recibidos');
//   const newReview = crearReviewService.createReview(req.body);
//   console.log('valor de nueva receta', newReview);
//   console.log('Resena creada', newReview);

//   let receta = crearReviewService.getRecipeById(req.params.id);

//   if (!receta) {
//     res.status(404).send('Receta no encontrada');
//   }
//   else{
//     console.log('Esta es la receta: ', receta);

//     let reviewId = crearReviewService.getId(newReview);
//     //console.log('Este es el id: ',reviewId);
//     receta.reviews[reviewId] = newReview;
//     res.redirect(`/detalle/${req.params.id}`); 
//   }  
// });

router.post('/detalle/:id', (req, res) => { 
  console.log('Datos recibidos');
  const newReview = crearReviewService.createReview(req.body);


  let receta = crearReviewService.getRecipeById(req.params.id);
  console.log('Traza 1, receta: ' , receta.id, receta.rcpName);

  if (!receta) {
    res.status(404).send('Receta no encontrada');
  } else {
    let reviewId = crearReviewService.getId(newReview);
    console.log('Traza 2, review: ' , receta.reviews[reviewId]);

    receta.reviews = receta.reviews || {};
    receta.reviews[reviewId] = newReview;
    console.log('Traza 3, review mod: ' , receta.reviews[reviewId]);
    receta.reviews[reviewId] = newReview;
    console.log('Traza 4, luego de guardar en array de array: ' , receta.reviews[reviewId]);
    res.redirect(`/detalle/${req.params.id}`); 
    console.log('Detalles', receta.reviews[reviewId]);
  }  
});


router.get('/detalle/:id', (req, res) => {
    const review = crearReviewService.getReviewById(req.params.id);
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

export default router;
