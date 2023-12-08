import express from 'express';
import * as crearReviewService from './crearReviewService.js';



const router = express.Router();


router.get('/', (req, res) => {
    // Lógica para renderizar la página detalle con todas las review
    console.log('Antes de renderizar');
    res.render('detalle', { reviews: crearReviewService.getAllReviews() });
    console.log('Se ha renderizado la lista de objetos');
});


  
router.get('/crearReview', (req, res) => { 
    // Renderizar la página de creación de reviews
    res.render('crearReview');
});
  
router.post('/crearReview', (req, res) => { 
  console.log('Datos recibidos');
  const newReview = crearReviewService.createReview(req.body);
  console.log('Resena creada', newReview);
  res.redirect(`/detalle/${newReview.id}`);
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
      res.redirect('/');
    }
  });

export default router;
