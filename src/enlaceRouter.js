import express from 'express';

const mainRouter = express.Router();

mainRouter.get('/enlace/:nenlace', (req, res) => {

    res.render('enlace', {
        nenlace: req.params.nenlace,
    });
});

export default mainRouter;