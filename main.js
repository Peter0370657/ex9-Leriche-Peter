var express = require('express');
var parser = require('body-parser');

var mongoose = require('mongoose'); //op aanraden van Jonas / Wibren
mongoose.connect("mongodb://localhost/opdracht9");

var dalDrone= require("./DroneStorage.js");
var dalLocation = require("./LocationStorage.js");
var dalWeather = require("./WeatherStorage.js");

//moet ook nog 3 voor validation bij komen, een voor drones, een voor locations en een voor weather
// var ValDrone = require ("");
// var ValLocation = require ("");
// var ValWeather = require ("");   Niet zeker of deze nodig is aangezien die in principe van een externe api zou komen (openweathermap)


var app = express();
app.use(parser.json()); 

app.get("/weather", function(request, response){
    dalWeather.listAllWeather(function(err, weather){
        if (err){
            throw err;
        }
        response.send(weather);
    });
});
app.post("/weather", function(request, response){
    var Weather = new Weather(request.body.Weatherid, request.body.Weatherdesc, request.body.Temp, request.body.unixtime, request.body.Location);
    
    dalWeather.CreateWeather(Weather, function(err, weather){
        if (err){
            console.log(err);
        }
        response.send(weather);
        
        console.log("Weather: \n"+JSON.stringify(weather)+" added");
    });  
});//sluit lijn 28





app.listen(8765);
console.log("hello world");