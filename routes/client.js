'use strict'

const router = require('express').Router()

const db = require('../db')

const user = 'juan'
const password = 'juan'


const config = {
    user: process.env.DB_USER || 'juan',
    pass: process.env.DB_PASS || 'juan'
}

const uri = process.env.DB_URL || "mongodb+srv://@dbstore-hgmx2.mongodb.net/DBStore?retryWrites=true&w=majority"

module.exports = async () => {
    const {Client} = await db(uri, config).catch(handleFatalError)

    router
        .get('/', async (req, res) => {
            let client = null

            client = await Client.findAll().catch(handleFatalError)

            if(!client) {
                return res.status(401).json({
                    status: false,
                    message: 'No hay clientes registrados'
                })
            }

            res.status(200).json({
                status: true,
                result: client
            })
        })
        .post('/', async (req, res) => {

            let client = null
            const body = req.body

            client = await Client.findByDni(body.dni)

            if(client) {
                return res.status(403).json({
                    status: false,
                    message: 'Ya existe un cliente registrado con este DNI'
                })
            }


            client = await Client.createOrUpdate(body)
                .catch((e) => {
                    res.status(500).json({
                        status: false,
                        message: 'Ocurrio un error en la operacion',
                        error: e
                    })
                })

            res.status(200).json({
                status: true,
                message: 'Cliente creado con exito',
                result: client
            })
        })

    return router
}

function handleFatalError (err) {
    console.log('ERRORR')
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
  }

    

