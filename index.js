// Declaramos los módulos que hemos tenido que instalar con npm previamente.
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

//Declaramos los módulos que tenemos en el directorio del proyecto.
var controller = require("./controller");
var urlResponseHandlers = require("./urlResponseHandlers");

//Para utilizar vistas ejs.
app.set('view engine', 'ejs');

//Definimos de donde vamos a servir los contenidos estaticos.
app.use(express.static(__dirname + '/public'));

//Para el parseo de objetos JSON
app.use(bodyParser.json());

//Para el parseo de multipart/form-data
app.use(multer());

app.get('/', function(req, res) {
	controller.dispatch(urlResponseHandlers.index, req, res);
});

app.get('/formulario', function(req, res) {
    controller.dispatch(urlResponseHandlers.formulario, req, res);
});

app.get('/estIndividuales', function(req, res) {
	controller.dispatch(urlResponseHandlers.estIndividuales, req, res);
});

app.get('/resultados', function(req, res) {
	controller.dispatch(urlResponseHandlers.resultados, req, res);
});

app.get('/contacto', function(req, res) {
	controller.dispatch(urlResponseHandlers.contacto, req, res);
});

app.post('/insertarJugador', function(req, res) {
	controller.dispatch(urlResponseHandlers.insertarJugador, req, res);  
});

//Mantenemos el servidor a la escucha en el puerto 3000.
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Servidor a la escucha en el puerto " + port);
});



