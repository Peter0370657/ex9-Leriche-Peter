/* global id */

var mongoose = require("mongoose");       //Mongoose op aanraden van Wibren/jonas omdat het makkelijker is om mee te werken

var DroneSchema = mongoose.Schema({
    Droneid: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,    //Datetime werkt blijkbaar niet, aanpassen naar string
        required: true
    },
    mac: {
        type: String,
        required: true
    }
});


var Drone = mongoose.model('Drones', DroneSchema);

module.exports = {
    listAllDrones: function (callback){
         Drone.find(callback);
    },
    findDrone: function(Droneid, callback){
        Drone.find({Droneid: Droneid}, callback);
    },
    createDrone: function(drone, callback){                             //Create = POST
        Drone.create(drone, callback);
    },
    updateDrone: function(id, newdrone, callback ){                     //update =PUT
        Drone.findOneAndUpdate({Droneid: id}, newdrone, callback);
    }
};