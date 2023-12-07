import express from 'express';
import * as crearReviewService from './crearReviewService.js';



const router = express.Router();


router.get('/', (req, res) => {
    // Lógica para renderizar la página detalle con todas las review
    res.render('detalle', { reviews: crearReviewService.getAllReviews() });
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
    if (!review) {
      res.status(404).send('Review no encontrado');
    } else {
      res.render('detalle', review);
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
