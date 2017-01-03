var mongoose = require("mongoose");

var DroneSchema = mongoose.Schema({
    Location: {
        type: string,
        required: true
    },
    id: {
        type: string,
        required: true,
        unique: true
    },
    date: {
        type: datetime,
        required: true
    },
    mac: {
        type: string,
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