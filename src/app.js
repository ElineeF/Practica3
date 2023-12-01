import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
const crearElementoRouter = require('./crearElementoRouter');

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', mustacheExpress(), ".html");

app.use(bodyParser.urlencoded({extended: true}));

//configura archivos estáticos en carpeta public
app.use(express.static(__dirname + '/public'));

//rutas

app.use('/', crearElementoRouter);


app.listen(3000, () => console.log('Listening on port 3000!'))