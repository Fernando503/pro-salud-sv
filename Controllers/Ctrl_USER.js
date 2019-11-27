'use strict'
const User = require('./../Models/Model_user')

function loginUser(req, res){
	req.session = true
	res.status(200).send({message:"funcion de Login"})
}

function addUser(req,res){
	console.log('Request from: https://localhost:8000/API/ProSalud/User/a')
	let userModel = new User()
	userModel.email = req.body.email
	userModel.nombre = req.body.nombre
	userModel.picture = req.body.picture
	userModel.username = req.body.username
	userModel.password = req.body.password
	userModel.loginDate = req.body.loginDate
	userModel.lastLogin = req.body.lastLogin
	userModel.permisos = req.body.permisos

	try {
	userModel.save((err, userStored) =>{
		if (err) res.status(500).send({message:"Error al guardar usuario"})

		res.status(200).send({message:"Usuario guardado exitosamente"})
	})
	}catch (e) {
		console.log(e)
	}
}

module.exports = {
	loginUser,
	addUser
}