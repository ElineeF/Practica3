import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import crearElementoRouter from './crearElementoRouter.js';
import crearReviewRouter from './crearReviewRouter.js';

const app = express();
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/../views');

app.use(bodyParser.urlencoded({extended: true}));

//configura archivos estáticos en carpeta public
app.use(express.static(__dirname + '/../public'));

//rutas
app.use('/', crearElementoRouter);
app.use('/', crearReviewRouter);


app.listen(3000, () => console.log('Listening on port 3000!'))