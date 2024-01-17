import express from 'express';
import path from 'path';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import crearElementoRouter from './crearElementoRouter.js';
import crearReviewRouter from './crearReviewRouter.js';



const app = express();

//Motor de plantillas
app.engine('html', mustacheExpress());
app.set('view engine', 'html');

//Carpeta views
app.set('views', __dirname + '/../views');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configura archivos estáticos en carpeta public
app.use(express.static(path.join(__dirname, '/../public')));

// Rutas
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '/../views', 'error.html'));
});
app.use('/', crearElementoRouter);
app.use('/', crearReviewRouter);

// Iniciar servidor
app.listen(3001, () => console.log('Listening on port 3001!'))