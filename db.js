'use strict'

const mongoose = require('mongoose')


const setupDatabase = require('./controllers/db')

const setupClientModel = require('./models/client')
const setupClient = require('./controllers/client')

const defaults = require('defaults')

module.exports = async function(uri, config) {
    config = defaults(config, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        // autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    })

    const mongoose = await setupDatabase(uri, config)

    const ClientModel = await setupClientModel(uri, config)

    if (config.setup) {
        await mongoose.connection.db.dropDatabase() // eliminamos la base de datos :( :( :(
    }

    const Client = setupClient(ClientModel)

    return {
        Client
    }
}

