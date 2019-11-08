'use strict'
const express = require('express')
const rutas = express.Router()

rutas.get('/', (req,res)=>{
	res.status(200).send({message:'Ingreso a la API exitosamente'})
})

module.exports = rutas
