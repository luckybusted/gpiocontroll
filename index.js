'use strict';
var Alexa = require("alexa-sdk");
var appId = 'amzn1.ask.skill.caa93b39-97a4-4746-9451-1f6b2427c016'; //'amzn1.echo-sdk-ams.app.your-skill-id';
var s3saver = require('./s3saver');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(newSessionHandlers); //add more handlers here, z.B.: alexa.registerHandlers(newSessionHandlers, guessModeHandlers, startGameHandlers, guessAttemptHandlers);
    alexa.execute();
};

function saveTo(data){
    console.log('hello');
    var json = JSON.stringify(data);
    s3saver.saveJSONtoS3(json);
}

var newSessionHandlers = {
    //neccessery fallback function do not delete
    'Unhandled': function() {
    this.emit(':ask', 'ERROR Unhandled Session');
    },
    'GPIOControlIntent': function () {

        var obj = {
               table: []
            };

        var pin = this.event.request.intent.slots.pin.value.toLowerCase(),
            status = this.event.request.intent.slots.status.value.toLowerCase();
            obj.table.push({pin: pin, state: status});

        console.log('OBJ', obj);

        saveTo(obj);

        this.emit(':tell', 'Ich habe den Pin ' + pin + ' auf ' + status + ' gesetzt.');
    }
};
