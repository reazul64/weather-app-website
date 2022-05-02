const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const { send } = require('process');

const app = express();

// Define paths for express configuration
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPathDirectory));


// Setup dynamic directories to serve
app.get('', (req, res) => {
    res.render("index", {
        title: "Weather",
        authorName: "Robo"
    });
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Me",
        authorName: "Robo"
    });
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help",
        authorName: "Robo"
    });
})

// App contents
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    geocode(req.query.address, (error, { address, latitude, longitude } = {}) => {
        if (error) { return res.send({ error }) };

        forecast(latitude, longitude, (error, data) => {
            if (error) { return res.send({ error }) };

            res.send({
                address,
                forecast: data
            })
        })
    })
})


app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error",
        errorMessage: "Help article not found",
        authorName: "Robo"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error",
        errorMessage: "Page not found",
        authorName: "Robo"
    })
})



// starting the server
app.listen(3000, () => {
    console.log("Server is up on port 3000");
})