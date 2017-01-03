var mongoose = require("mongoose");

var WeatherSchema = mongoose.Schema({
    Weatherid: {
        type: Number,
        required: true,
    },
    Weatherdesc: {
        type: String,
        required: true  

    },
    Temp: {
        type: Number,
        required: true
    },
    
    unixtime: {
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
        Weather.find({weatherid: weatherid}, callback);
    },
    createWeather: function (weather, callback) {
        Weather.create(weather, callback);
    },
    updateSale: function (id, newwe, callback) {
        Weather.findOneAndUpdate({weatherid: id}, newwe, callback);
    }
};