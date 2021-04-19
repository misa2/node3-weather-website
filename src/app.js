const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine andviews location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',
        {
            title: 'Weather',
            name: 'Milos Kostic',
        })
})

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About Me',
            name: 'Milos Kostic',
        })
})

app.get('/help', (req, res) => {
    res.render('help',
        {
            title: 'Help',
            name: 'Milos Kostic',
            message: 'This is simple weather app',
        })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })



})

app.get('/help/*', (req, res) => {
    res.render('404',
        {
            title: '404 Error - Not found',
            name: 'Milos Kostic',
            errorMessage: 'Help article not found.',
        })
})

app.get('*', (req, res) => {
    res.render('404',
        {
            title: '404 Error - Not found',
            name: 'Milos Kostic',
            errorMessage: 'Page not found.',
        })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})