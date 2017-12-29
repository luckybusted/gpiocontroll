'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3();

function saveJSONtoS3(json){

    console.log('SAVEJSON', json);

    let params = {
        Bucket: 'gpiocontroll', // your bucket name,
        Key: 'test.txt', // path to the object you're looking for
        Body: json
    };

    s3.putObject(params, function(err, data) {
         console.log('INSIDE FUNCTION');
        if (err) {
            console.log('ERROR', err);
        }
        else {
            console.log('UPLOADED SUCCESS');
        }
    });


    console.log('END')


}

module.exports = {
    saveJSONtoS3 : saveJSONtoS3
};
