const request = require('postman-request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHV5ZW5idWkzMDMwIiwiYSI6ImNrY2trZjNwNTEzdngycW1oZG51aHlqcXoifQ.-PxHI0xl474hy7M84TOpWw'
    request({ url, json: true }, (erorr, { body }) => {
        if (erorr) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode