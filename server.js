console.log("iniciando server de Node...");

//Drone Control Code

var arDrone = require("ar-drone");
//Creamos un cliente del parrot ar drone
var drone = arDrone.createClient();

function bateria(){
	console.log("Bateria: "+drone.battery());
}

function despegar() {
	drone.config("control:altitude_max", 100000);
	bateria();
	drone.takeoff();
	rotar();
}

function rotar() {
	//siempre debemos parar la instruccion anterior
	drone.stop();
	drone.calibrate(0);
}

function aterrizar() {
	drone.stop();
	bateria();
	drone.land();
}

//Expres y servidor web
var express = require("express");
var web = express();

var servidor;

servidor= web.listen (8080, function(){
	console.log("💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 ");
	console.log("💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 💀 ");
	console.log("The Drone server is runnin now..")
});

web.get("/", function(req, res){
	console.log("Home");
	bateria();
	res.sendfile("opciones.html");
});

web.get("/despegar", function(req, res){
	console.log("Despegando");
	despegar();
	res.sendfile("opciones.html");
});

web.get("/aterrizar", function(req, res){
	console.log("Aterrizando");
	aterrizar();
	res.sendfile("opciones.html");
});

//La libreria que controla a los drones la instalamos usando 
//$ npm install ar-drone


/*Ahora debemos conectarnos a la red wifi que emite el dron (parrot ar drone)
el drone que ahora es un "router" esta en la direccion 192.168.1.1 y la ip de la laptop
de freddy en el curso es la 192.168.1.2
*/



