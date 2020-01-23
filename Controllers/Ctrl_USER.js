'use strict'
const User = require('./../Models/Model_user')
const passport = require('passport')
const {SECRET_TOKEN} = require('../resources/config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const LocalStrategy = require('passport-local').Strategy;

passport.use('local_login', new LocalStrategy({
	username: 'username',
	password: 'password'
},
 (username, password, done) => {
    try {
    	//console.log('Usuario ingresado: '+username)
            User.findOne({username:username}, function callback(error, user) {
				
            //console.log('retornando data: '+user)
            
            if( !user )            
                return done(null, false, { message : 'Usuario no encontrado'});

					bcrypt.compare(password, user.password, function(err, res) {
					  if (err){
					   console.log('ERR: -> '+err)
					  }
					  if (res){
					  	 const payload = {Usuario:{
					  	 	email: user.email,
					  	 	nombre: user.nombre,
					  	 	username: user.username,
					  	 	permisos: user.permisos,
					  	 	picture: user.picture
					  	 }}
					  	const token = jwt.sign(payload, SECRET_TOKEN, {
						   expiresIn: 30
						  })
					  	return done(null, user, { message : 'Login exitoso', token:token});
					    console.log('RES: -> '+res)
					  } else {
					    // response is OutgoingMessage object that server response http request
					    return done(null, false, { message : 'Contraseña incorrecta'});
					  }
					})
             }) 
        } catch (error) {
            return done(err)
        }
  }
))

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
	addUser
}