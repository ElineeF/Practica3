import express from 'express';
import * as indexService from './indexService.js';

const router = express.Router();

router.get('/', (req, res) => {

    res.render('index', { 
        posts: indexService.getPosts() 
    });
});

/*Añadir receta a página prinicpal código base*/
router.post('/post/new', (req, res) => {

    let { user, title, text } = req.body;

    indexService.addPost({ user, title, text });

    res.render('saved_post');
});

/*Mostrar receta código base*/
router.get('/post/:id', (req, res) => {

    let post = indexService.getPost(req.params.id);

    res.render('show_post', { post });
});


export default router;