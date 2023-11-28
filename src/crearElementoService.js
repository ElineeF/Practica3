import express from 'express';

const router = express.Router();

router.post('/nuevaReceta', (req, res) => {

    res.render('receta', {
        image: req.body.image,
        rcpName: req.body.rcpName,
        rcpIngredients: req.body.rcpIngredients,
        rcpDescription: req.body.rcpDescription
    });
});

export default router;