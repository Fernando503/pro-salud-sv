'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const rutas = require('.././Route/routes')
const session = require('express-session')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/API/ProSalud',rutas)

module.exports = app