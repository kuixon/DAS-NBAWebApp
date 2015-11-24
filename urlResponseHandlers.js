// Declaramos los módulos que hemos tenido que instalar con npm previamente.
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cradle = require('cradle');

//Declaramos los módulos que tenemos en el directorio del proyecto.
var cargarPagina = require('./cargarPagina');

//Para el parseo de objetos JSON
app.use(bodyParser.json());

//Para el parseo de multipart/form-data
app.use(multer());

//Creamos la conexión al servidor de base de datos couchdb.
var connection = new(cradle.Connection)('http://127.0.0.1', 5984, {
	auth: { username: 'Endika', password: 'Endika' }
});

//Nos conectamos a la base de datos 'jugadores'. En caso de que no exista la creamos.
var db = connection.database('jugadores');
db.exists(function (err, exists) {
	if (err) {
		console.log('error', err);
	} else if (exists) {
		console.log("Conectado correctamente a la base de datos 'jugadores'.");
	} else {
		console.log('La base de datos no existe.');
		db.create();
		/* populate design documents */
	}
});

//Creamos una vista de los jugadores para realizar consultas (querys) sobre ella.
db.save('_design/jugadores', {
	all: {
		map: function (doc) {
	    	if (doc.nombre && doc.apellido && doc.equipo && doc.posicion && doc.edad && doc.estilo) {
	    		emit(doc.nombre, doc);
	    	}
		}
	}
});

//Array de numeros usados.
var usados = new Array();
//funciones para obtener un id unico e irrepetible.
function aleatorio(min, max) { 
	if (usados.length !=(max-min)) { 
		while (repe != false) { 
			var num = Math.floor(Math.random()*(max-min+1))+min; 
			var repe = repetido(num); 
		} 
		usados.push(num); 
		return num; 
	} else { 
		return null; 
	} 
}
function repetido(num) 
{ 
	var repe = false; 
	for (i=0; i<usados.length; i++) {
		if (num == usados[i]) { 
			repe = true;
		} 
	} 
	return repe; 
}

//Declaramos la función index en la que ejecutaremos el código correspondiente.
function index(req, res) {
	console.log("Manipulador de peticion 'index' fue llamado.");
	cargarPagina.cargar(req, res);
}

//Declaramos la función formulario en la que ejecutaremos el código correspondiente.
function formulario(req, res) {
	console.log("Manipulador de peticion 'formulario' fue llamado.");
	cargarPagina.cargar(req, res);
}

//Declaramos la función estIndividuales en la que ejecutaremos el código correspondiente.
function estIndividuales(req, res) {
	console.log("Manipulador de peticion 'estIndividuales' fue llamado.");
	cargarPagina.cargar(req, res);
}

//Declaramos la función resultados en la que ejecutaremos el código correspondiente.
function resultados(req, res) {
	console.log("Manipulador de peticion 'resultados' fue llamado.");
	
	//Declaramos los arrays.
	var nombres = [];
	var apellidos = [];
	var equipos = [];
	var posiciones = [];
	var edades = [];
	var estilos = [];

	db.view('jugadores/all', function (err, response) {
    	response.forEach(function (row) {
        	console.log("////////////////////////");
        	console.log("Nombre: " + row.nombre);
        	console.log("Apellido: " + row.apellido);
        	console.log("Equipo: " + row.equipo);
        	console.log("Posicion: " + row.posicion);
        	console.log("Edad: " + row.edad);
        	console.log("Estilo: " + row.estilo);
        	
        	//Introducimos los datos de la base de datos en los arrays.
        	nombres.push(row.nombre);
        	apellidos.push(row.apellido);
        	equipos.push(row.equipo);
        	posiciones.push(row.posicion);
        	edades.push(row.edad);
        	estilos.push(row.estilo);
    	});
    	//Llamamos a la vista resultado pasándole los arrays.
  		res.render('resultado', {nombres: nombres, apellidos: apellidos, equipos: equipos, posiciones: posiciones, edades: edades, estilos: estilos});
  	});
}	

//Declaramos la función contacto en la que ejecutaremos el código correspondiente.
function contacto(req, res) {
	console.log("Manipulador de peticion 'contacto' fue llamado.");
	cargarPagina.cargar(req, res);
}

//Declaramos la función insertarJugador en la que ejecutaremos el código correspondiente.
function insertarJugador(req, res) {
	console.log("Manipulador de peticion 'insertarJugador' fue llamado.");
	var id = aleatorio(1, 10000);
	var idJugador = "jugador" + String(id);
	db.save(idJugador, {
		'nombre': req.body.nombre,
		'apellido': req.body.apellido,
		'equipo': req.body.equipo,
		'posicion': req.body.posicion,
		'edad': req.body.edad,
		'estilo': req.body.estilo
		}, function (err, res) {
		if (err) {
		  	// Handle error
		  	console.log('Error [db.save]: ', err.message);
			return;
		} else {
		  	// Handle success
		  	console.log('El jugador se ha guardado correctamente en la base de datos.');
		}
	});
	cargarPagina.cargar(req, res);
}

//Exportamos los métodos para que podamos llamarlos desde diferentes módulos.
exports.index = index;
exports.formulario = formulario;
exports.estIndividuales = estIndividuales;
exports.resultados = resultados;
exports.contacto = contacto;
exports.insertarJugador = insertarJugador;