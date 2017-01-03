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
    
    
};