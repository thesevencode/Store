'use strict'

const app = require('express')()
const http = require('http').Server(app)
const bodyParser = require('body-parser');

const routes = require('./routes/index')

const PORT = process.env.PORT || 3000


const user = 'juan'
const password = 'juan'


const uri = `mongodb+srv://${user}:${password}@cluster0-hgmx2.gcp.mongodb.net/test?retryWrites=true&w=majority`;



// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routes
routes(app)


http.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})

