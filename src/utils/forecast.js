const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
//const url = 'http://api.weatherstack.com/current?access_key=ffb41785bc07e7c96b2915b7a0548480&query=21.028511,105.804817&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=ffb41785bc07e7c96b2915b7a0548480&query='+ latitude + ',' + longitude + '&units=m'
//const url = 'http://api.weatherstack.com/current?access_key=ffb41785bc07e7c96b2915b7a0548480&query='+ latitude + ',' + longitude
console.log(url)
    request({ url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degres out. There is a ' + body.current.feelslike + '% chance of rain.')
        }
    })
}
module.exports = forecast