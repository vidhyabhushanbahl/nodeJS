const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a46bdf8fc3bc78bfc2c4ec51215e8c9b/' + latitude + ',' + longitude
    request({
        url: url,
        json: true
    }, (error, response) => {
        callback(undefined, response.body.daily.data[0].summary)
    })
}
module.exports = forecast