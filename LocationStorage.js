var mongoose = require("mongoose");           //Mongoose op aanraden van Wibren/jonas omdat het makkelijker is om mee te werken

var LocationSchema = mongoose.Schema({
    locatieid: {
        type: String,
        required: true,
        unique: true
    },
    naam: {
        type: String,
        required: true
    },
    stad: {
        type: String,
        required: true
    },
    capaciteit: {
        type: Number,
        required: true
    },
    Lokaal: {
        type: String,
        required: true
    }
});

var Locatie = mongoose.model('locations', LocationSchema);

module.exports = {

    listAllLocations: function (callback) {
        Locatie.find(callback);
    },
    findLocation: function (stad, callback) {
        Locatie.find({stad: stad}, callback);
    },
    createLocation: function (locatie, callback) {                  //Create = POST
        Locatie.create(locatie, callback);
    },
    updateLocation: function (id, newloc, callback) {               //update = PUT
        Locatie.findOneAndUpdate({locatieid: id}, newloc, callback); 
    }
};