const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=998a56748cb45d9c6585f2a145b41bbf&query=${latitude}, ${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to access weather service.", undefined);
        }
        else if (body.error) {
            callback("Unable to access location service. Please specify a valid location identifier using the query parameter.", undefined);
        }
        else {
            callback(undefined, `Date & Time: ${body.location.localtime}. ${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees celcius. But it feels like ${body.current.feelslike} degrees.`);
        }
    })
}

module.exports = forecast;