module.exports = {

    fieldsNotEmpty: function (object) {
        var errors = [];                                            // in deze array worden de errors gepushed.
        for (i = 1; i < arguments.length; i++) {
            if (!this.fieldNotEmpty(object, arguments[i])) {        //kijken of het veld op plaats i empty is of niet.
                errors.push(arguments[i]);                          //dit pushed de error naar de array op positie i
            }
        };
        return errors.length === 0 ? null : errors;    // if length van errors 0 is -> return null.  Anders, return de errors.

    },

    fieldNotEmpty: function (object, field) {                   //initialisatie van de functie die gebruikt is op lijn 6.
        return object && object[field] && object[field] !== "";
    }

};