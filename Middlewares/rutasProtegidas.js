'use strict'
const {SECRET_TOKEN} = require('../resources/config.js')
const jwt = require('jsonwebtoken')
const rutasProtegidas = (req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, SECRET_TOKEN, (err, decoded) => {      
        if (err) {
          return res.status(401).json({ mensaje: 'No tienes autorización, token invalido' })
        } else {
          req.decoded = decoded  
          next()
        }
      })
    } else {
      res.status(401).send({ 
          mensaje: 'No se proporciono token' 
      })
    }
 }

module.exports = {rutasProtegidas}