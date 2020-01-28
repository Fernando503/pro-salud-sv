'use strict'
const Institucion = require('./../Models/Model_instituciones')
var fecha = require('../utils')

function addInstitucion(req, res) {
    try {
        let insti = new Institucion({
            nombre: req.body.nombre,
            correo: req.body.email,
            logo: req.body.logo,
            direccion: [{
                direccion1: req.body.direccion1,
                direccion2: req.body.direccion2,
                direccion3: req.body.direccion3
            }],
            telefono: [{
                fijo1: req.body.fijo1,
                fijo2: req.body.fijo2,
                movil: req.body.movil,
                whatsapp: req.body.whatsapp
            }],
            servicios: [{
                servicio1: req.body.servicio1,
                servicio2: req.body.servicio2,
                servicio3: req.body.servicio3,
                servicio4: req.body.servicio4,
                servicio5: req.body.servicio5,
                servicio6: req.body.servicio6,
                servicio7: req.body.servicio7,
                servicio8: req.body.servicio8,
                servicio9: req.body.servicio9,
                servicio10: req.body.servicio10
            }]
        })

       insti.save(function(err) {
        if (err) return res.status(500).send({code: 1, message: err})
     
       	return res.status(200).send({code: 0, message: 'Institucion guardada correctamente'})
    });


    } catch (err) {
    	console.log(err)
    	return res.status(500).send({code: 1, message: err})
    }
}

module.exports = {
    addInstitucion
}