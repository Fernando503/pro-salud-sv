'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmergenciaSchema = Schema({
	username: { type: String, unique: true,  required: true},
	nombre: { type: String, required: true},
	apellido: String,
	telefono: { type: String, required: true},
	direccion: { type: String, required: true},
	tipoSangre: String,
	familiar: [{
		familiar1: [{
			nombre: String,
			apellido: String,
			parentesco: String,
			telefono: String,
			direccion: String
		}],
		familiar2: [{
			nombre: String,
			apellido: String,
			parentesco: String,
			telefono: String,
			direccion: String
		}],
		familiar3: [{
			nombre: String,
			apellido: String,
			parentesco: String,
			telefono: String,
			direccion: String
		}],
		familiar4: [{
			nombre: String,
			apellido: String,
			parentesco: String,
			telefono: String,
			direccion: String
		}],
		familiar5: [{
			nombre: String,
			apellido: String,
			parentesco: String,
			telefono: String,
			direccion: String
		}]
	}],
	enfermedades: [{
		enfermedad1: String,
		enfermedad2: String,
		enfermedad3: String,
		enfermedad4: String,
		enfermedad5: String
	}],
	alergias: [{
		medicamentos: [{
			medicamento1: String,
			medicamento2: String,
			medicamento3: String,
			medicamento4: String,
			medicamento5: String
		}],
		otros: [{
			razon1: String,
			razon2: String,
			razon3: String,
			razon4: String,
			razon5: String
		}]
	}],
	tratamientosActuales: [{
		tratamiento1: [{
			nombre: String,
			docis: String,
			periodo: String
		}],
		tratamiento2: [{
			nombre: String,
			docis: String,
			periodo: String
		}],
		tratamiento3: [{
			nombre: String,
			docis: String,
			periodo: String
		}],
		tratamiento4: [{
			nombre: String,
			docis: String,
			periodo: String
		}],
		tratamiento5: [{
			nombre: String,
			docis: String,
			periodo: String
		}]
	}],
	created: { type: Date, default: Date.now },
    estado: { type: String, default: "Activo" }

})


module.exports = mongoose.model('Emergency', EmergenciaSchema)