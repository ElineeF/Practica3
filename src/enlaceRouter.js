import express from 'express';

const router = express.Router();

router.get('/enlace/:nenlace', (req, res) => {

    res.render('enlace', {
        nenlace: req.params.nenlace,
    });
});

export default router;