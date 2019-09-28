'use strict'

const Mongoose = require('mongoose')
const setupDatabase = require('../controllers/db')

module.exports = async function setupClientModel(uri, config) {
    const mongoose = await setupDatabase(uri, config)

    const clientSchema = new Mongoose.Schema({
        dni: {type: Number, unique: true, required: true},
        name: {type: String, required: true},
        address: {type: String, required: true},
        phone: {type: Number, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true}
    })


    return module.exports = mongoose.model('client', clientSchema)

}

