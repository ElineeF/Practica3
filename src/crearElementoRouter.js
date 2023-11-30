import express from 'express';
import * as crearElementoService from './crearElementoService.js';

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

/*Borrar elemento código base*/
router.get('/post/:id/delete', (req, res) => {

    crearElementoService.deletePost(req.params.id);

    res.render('deleted_post');
});

export default router;
