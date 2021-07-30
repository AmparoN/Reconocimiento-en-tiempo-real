/*jshint esversion: 6 */
let BrokerMQTT = 'mqtt://grupo2.cloud.shiftr.io';
let PuertoMQTT = 1883;
let ClienteIDMQTT = "MQTT-Nodejs";
let UsuarioMQTT = "grupo2";
let ContrasenaMQTT = "grupofifi";

const SerialPort = require('serialport');
const port = new SerialPort("COM10", {
  baudRate: 9600
});

let Opciones = {
  port: PuertoMQTT,
  clientId: ClienteIDMQTT,
  username: UsuarioMQTT,
  password: ContrasenaMQTT
};

var mqtt = require('mqtt');
var client = mqtt.connect(BrokerMQTT, Opciones);

client.on('connect', function() {
  client.subscribe('grupo2/Clasificar', function(err) {
    console.log("MQTT Activado");
  });
});

client.on('message', function(topic, message) {
    console.log(message.toString());
});


client.on('message', function(topic, message) {
  let Mensaje = message.toString();
  if (Mensaje == "ARMA DETECTADA") {
    console.log("Encender led");
    port.write("H");
  } else if (Mensaje == "SEGURO") {
    console.log("Apagar led");
    port.write("L");
  }
});
