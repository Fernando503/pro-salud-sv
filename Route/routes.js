'use strict'
const express = require('express')
const rutas = express.Router()
const userCtrl = require('../Controllers/Ctrl_USER')

rutas.get('/', (req,res)=>{
	res.status(200).send({message:'Ingreso a la API exitosamente'})
})

rutas.post('/User/a',userCtrl.addUser)

module.exports = rutas
