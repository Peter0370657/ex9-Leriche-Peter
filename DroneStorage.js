var mongoose = require("mongoose");

var DroneSchema = mongoose.Schema({
    Location: {
        type: String,
        required: true
    },
    id: {
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
    findDrone: function(id, callback){
        Drone.find({id: id}, callback);
    },
    createDrone: function(drone, callback){
        Drone.create(drone, callback);
    },
    updateDrone: function(id, newdrone, callback ){
        Drone.findOneAndUpdate({id: id}, newdrone, callback);
    }
};