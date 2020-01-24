'use strict'
const https = require('https')
const fs = require('fs')
const app = require('./resources/app')
const config = require('./resources/config')
const mongoose = require('mongoose')

// Conexion de la  Base de datos
mongoose.connect(config.db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar con la base de datos: ${err}`)
    }
    console.log('Conexión establecida con MongoDB')
})


https.createServer({
    key: fs.readFileSync('./resources/SSL/server.key'),
    cert: fs.readFileSync('./resources/SSL/server.cert')
}, app).listen(config.port, () => {
    console.log(`Running in https://localhost:${config.port}/`)
})