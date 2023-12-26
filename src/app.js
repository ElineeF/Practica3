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

app.use(bodyParser.urlencoded({extended: true}));

//configura archivos estáticos en carpeta public
app.use(express.static(__dirname + '/../public'));

  app.get('/error', (req, res) => {
   // En este ejemplo, 'mi-archivo.html' está dentro de la carpeta 'public'
   res.sendFile(path.join(__dirname, '../views', 'error.html'));
 }); 

//rutas
app.use('/', crearElementoRouter);
app.use('/', crearReviewRouter);

app.listen(3001, () => console.log('Listening on port 3000!'))