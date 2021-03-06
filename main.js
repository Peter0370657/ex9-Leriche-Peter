var express = require('express');                   //eenvoudige webserver in nodejs
var parser = require('body-parser');                //eenvoudig body uitlezen

var mongoose = require('mongoose');                 //op aanraden van Jonas / Wibren
mongoose.connect("mongodb://localhost/opdracht9");  //connecten met mongodb via mongoose

//oproepen van datastores die beschreven staan in de ___Storage.js files
var dalDrone = require("./DroneStorage.js");        
var dalLocation = require("./LocationStorage.js");  
var dalWeather = require("./WeatherStorage.js");    

//moet ook nog 3 voor validation bij komen, een voor drones, een voor locations en een voor weather
// var ValDrone = require ("");
// var ValLocation = require ("");
// var ValWeather = require ("");   Niet zeker of deze nodig is aangezien die in principe van een externe api zou komen (openweathermap)
var validate = require('./Validation.js');

var app = express();
app.use(parser.json());

//WEATHER

app.get("/weather", function (request, response) {
    dalWeather.listAllWeather(function (err, weather) {
        if (err) {
            throw err;
        }
        response.send(weather);
    });
});

var Weatherp = function (Weatherid, Weatherdesc, Temp, unixtime, Location) {
    this.Weatherid = Weatherid;
    this.Weatherdesc = Weatherdesc;
    this.Temp = Temp;
    this.unixtime = unixtime;
    this.Location = Location;
};
app.post("/weather", function (request, response) {
    var Weather = new Weatherp(
            request.body.Weatherid,
            request.body.Weatherdesc,
            request.body.Temp,
            request.body.unixtime,
            request.body.Location
            );

    dalWeather.createWeather(Weather, function (err, weather) {
        var errors = validate.fieldsNotEmpty(Weather,
                "Weatherid",
                "Weatherdesc",
                "Temp",
                "unixtime",
                "Location"
                );
        if (errors) {
            response.status(400).send({msg: "Volgende velden ontbreken of zijn verkeerd ingevuld:" + errors.concat()});
            return;
        }
        response.send(weather);

        console.log("Weather added");
    });
});

app.put("/weather/:Weatherid", function (request, response) {
    var Weather = new Weatherp(
            request.body.Weatherid,
            request.body.Weatherdesc,
            request.body.Temp,
            request.body.unixtime,
            request.body.Location
            );
    var errors = validate.fieldsNotEmpty(Weather,
            "Weatherid",
            "Weatherdesc",
            "Temp",
            "unixtime",
            "Location");
    if (errors) {
        response.status(400).send({msg: "Volgende velden ontbreken of zijn verkeerd ingevuld:" + errors.concat()});
        return;
    }
    dalWeather.updateWeather(request.params.Weatherid, Weather, function (err, weather) {
        if (err) {
            console.log(err);
        }
        response.send(weather);
        console.log(request.body.Weatherid + " updated");
    });

});

//DRONE

app.get("/drone", function (request, response) {
    dalDrone.listAllDrones(function (err, Drone) {
        if (err) {
            throw err;
        }
        response.send(Drone);
    });
});

var Dronep = function (Droneid, Location, ID, date, mac) {
    this.Droneid = Droneid;
    this.Location = Location;
    this.ID = ID;
    this.date = date;
    this.mac = mac;
};

app.post("/drone", function (request, response) {
    var Drone = new Dronep(
            request.body.Droneid,
            request.body.Location,
            request.body.ID,
            request.body.date,
            request.body.mac
            );
    var errors = validate.fieldsNotEmpty(Drone,
            "Droneid",
            "Location",
            "ID",
            "date",
            "mac"
            );
    if (errors) {
        response.status(400).send({msg: "Volgende velden ontbreken of zijn verkeerd ingevuld:" + errors.concat()});
        return;
    }
    dalDrone.createDrone(Drone, function (err, drone) {
        if (err) {
            console.log(err);
        }
        response.send(drone);

        console.log("Drone added");
    });
});

app.put("/drone/:Droneid", function (request, response) {
    var Drone = new Dronep(
            request.body.Droneid,
            request.body.Location,
            request.body.ID,
            request.body.date,
            request.body.mac
            );
    var errors = validate.fieldsNotEmpty(Drone,
            "Droneid",
            "Location",
            "ID",
            "date",
            "mac"
            );
    if (errors) {
        response.status(400).send({msg: "Volgende velden ontbreken of zijn verkeerd ingevuld:" + errors.concat()});
        return;
    }
    dalDrone.updateDrone(request.params.Droneid, Drone , function (err, drone) {
        if (err) {
            console.log(err);
        }
        response.send(drone);
        console.log("Drone Updated");
    });
});

//LOCATION

app.get("/location", function (request, response) {
    dalLocation.listAllLocations(function (err, locatie) {
        if (err) {
            throw err;
        }
        response.send(locatie);
    });
});

var Locationp = function (locatieid, naam, stad, capaciteit, Lokaal) {
    this.locatieid = locatieid;
    this.naam = naam;
    this.stad = stad;
    this.capaciteit = capaciteit;
    this.Lokaal = Lokaal;
};

app.post("/location", function (request, response) {
    var Location = new Locationp(
            request.body.locatieid,
            request.body.naam,
            request.body.stad,
            request.body.capaciteit,
            request.body.Lokaal);
    var errors = validate.fieldsNotEmpty(Location,
            "locatieid",
            "naam",
            "stad",
            "capaciteit",
            "Lokaal"
            );
    if (errors) {
        response.status(400).send({msg: "Volgende velden ontbreken of zijn verkeerd ingevuld:" + errors.concat()});
        return;
    }
    dalLocation.createLocation(Location, function (err, location) {
        if (err) {
            console.log(err);
        }
        response.send(location);

        console.log("Location added");
    });
});


app.put("/location/:locatieid", function (request, response) {
    var Locatie = new Locationp(
        request.body.locatieid,
        request.body.naam,
        request.body.stad,
        request.body.capaciteit,
        request.body.Lokaal);
    var errors = validate.fieldsNotEmpty(Locatie,
        "locatieid",
        "naam",
        "stad",
        "capaciteit",
        "Lokaal");
    if (errors) {
        response.status(400).send({msg: "Volgende velden ontbreken of zijn verkeerd ingevuld:" + errors.concat()});
        return;
    }
    dalLocation.updateLocation(request.params.locatieid, Locatie, function (err, locatie) {
        if (err) {
            console.log(err);
        }
        response.send(locatie);
    });
    console.log("Weather updated");
});

app.listen(8765);
