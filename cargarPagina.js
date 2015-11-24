//Declaramos unas variables que necesitaremos para leer los diferentes tipos de archivos.
var http = require('http');
var fs = require('fs');
var path = require('path');

function cargar(req, res) {
	
	//Dependiendo de la url cargaremos una pagina u otra.
	switch(req.url) {
		case '/':
			res.sendFile(path.join(__dirname, './public', 'index.html'));
			break;
		case '/formulario':
			res.sendFile(path.join(__dirname, './public', 'formulario.html'));
			break;
		case '/estIndividuales':
			res.sendFile(path.join(__dirname, './public', 'estIndividuales.html'));
			break;
		case '/resultados':
			res.sendFile(path.join(__dirname, './public', 'resultados.html'));
			break;
		case '/contacto':
			res.sendFile(path.join(__dirname, './public', 'contacto.html'));
			break;
		case '/insertarJugador':
			res.sendFile(path.join(__dirname, './public', 'jugadorInsertado.html'));
			break;
	}
}

//Exportamos el método para que pueda usarse en otras clases.
exports.cargar = cargar;