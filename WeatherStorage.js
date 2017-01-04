var mongoose = require("mongoose");                     //Mongoose op aanraden van Wibren/jonas omdat het makkelijker is om mee te werken

var WeatherSchema = mongoose.Schema({
    Weatherid: {
        type: Number,
        required: true 
    },
    Weatherdesc: {
        type: String,
        required: true  
    },
    Temp: {
        type: Number,
        required: true
    },
    unixtime: {                 //kan makkelijk met een functie omgezet worden naar date/ time.  komt in de externe APi zo aan bod.
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    }
});

var Weather = mongoose.model('weather', WeatherSchema); 

module.exports = {

    listAllWeather: function (callback) {
        Weather.find(callback);
    },
    findWeather: function (weatherid, callback) {
        Weather.find({Weatherid: Weatherid}, callback);
    },
    createWeather: function (weather, callback) {                               //create -> POST
        Weather.create(weather, callback);
    },
    updateWeather: function (id, newwe, callback) {                             //update = PUT
        Weather.findOneAndUpdate({Weatherid: id}, newwe, callback);
    }
};