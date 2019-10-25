const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlkaHlhYmh1c2hhbiIsImEiOiJjazIxbTRmN2wwMXR1M2NtcmY4c21sYnl0In0.QSeSdwYCOiVy-541SppLAA'
    request({
        url: url,
        json: true
    }, (error, response) => {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        const data = {
            latitude: latitude, longitude: longitude,
            location: response.body.features[0].place_name
        }
        callback(undefined, data)
    })
}

module.exports = geocode