'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstitucionSchema = Schema({
	nombre: String,
	correo: { type: String, unique: true, lowercase: true },
	logo: String,
	direccion: [{
		direccion1: String,
		direccion2: String,
		direccion3: String
	}],
	geolocation: {
		type: { type: String },
		coordinates: [Number],
		},
	telefono: [{ 
		fijo1: String,
		fijo2: String, 
		movil: String,
		whatsapp: String
	}],
	servicios: [{
		servicio1: String,
		servicio2: String,
		servicio3: String,
		servicio4: String,
		servicio5: String,
		servicio6: String,
		servicio7: String,
		servicio8: String,
		servicio9: String,
		servicio10: String
	}]
})


module.exports = mongoose.model('Institution', InstitucionSchema)