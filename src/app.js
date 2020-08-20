const path = require('path')
const express = require('express') // import thư viện expess
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
//req là phần khách hàng đưa lên
//res là phần máy chủ trả về lại cho khách hàng
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Tuyen Bui'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name: 'Tuyen Bui',
        helpText: 'Help page'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        image: 'img/about.png',
        name: 'Tuyen Bui'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address Not Found!'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send( {error} )
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Search Empty!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (reg, res) => {
    res.render('404', {
        title: '404',
        name: 'Tuyen Bui',
        errorMessage: 'Help 404 page not found'
    })
})
app.get('*', (reg, res) => {
    res.render('404', {
        title: '404',
        name: 'Tuyen Bui',
        errorMessage: '404 page not found'
    })
})
// Lắng nghe khi trình duyệt gọi đến port 3000
app.listen(port, () => {
    console.log('Server is up on port 3000' + port)
})