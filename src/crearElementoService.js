import express from 'express';

const router = express.Router();

router.post('/nuevaReceta', (req, res) => {

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
});

export default router;
