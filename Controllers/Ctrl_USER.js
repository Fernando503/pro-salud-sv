'use strict'
const userModel = require('./../Models/Model_user')

function loginUser(req, res){
	req.session = true
	res.status(200).send({message:"funcion de Login"})
}

function addUser(req,res){
	res.status(200).send({message:"Return de TESTING FROM Controller"})
}

module.exports = {
	loginUser,
	addUser
}