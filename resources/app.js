'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const rutas = require('.././Route/routes')
const session = require('express-session')
const uuid = require('uuid/v4')
const config = require('./config')
var passport = require('passport')
const app = express()

// config Passport
app.use(passport.initialize())
app.use(passport.session())

// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: config.SECRET_TOKEN,
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/API/ProSalud',rutas)

module.exports = app