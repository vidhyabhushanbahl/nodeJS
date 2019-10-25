const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (request, response) => {
    response.render('index', { title: 'Weather', description: 'Here is the description' })
})

app.get('/about', (request, response) => {
    response.render('index', { title: 'About Us', description: 'About us description' })
})

app.get('/weather', (request, response) => {

    if (!request.query.address) {
        return response.send(
            {
                error: 'No location provided'
            }
        )
    }
    geocode(request.query.address, (error, { latitude, longitude, location }) => {

        if (error)
            return response.send({ error })

        forcast(latitude, longitude, (error, temp) => {
            response.send({
                address: request.query.address,
                longitude: longitude,
                latitude: latitude,
                temp: temp
            })
        })
    })
})



app.get('/help/*', (request, response) => {
    response.send('Help in construction')
})

app.get('*', (request, response) => {
    response.send('404 Not found')
})

app.listen(3000, () => {
    console.log('Server started...')
})