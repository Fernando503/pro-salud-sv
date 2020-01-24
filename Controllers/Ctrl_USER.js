'use strict'
const User = require('./../Models/Model_user')
const passport = require('passport')
const { SECRET_TOKEN } = require('../resources/config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var fecha = require('../utils')

const LocalStrategy = require('passport-local').Strategy;

passport.use('local_login', new LocalStrategy({
        username: 'username',
        password: 'password'
    },
    (username, password, done) => {
        try {
            var fechaActual = ''
            //console.log('Usuario ingresado: '+username)
            User.findOne({ username: username }, function callback(error, user) {

                //console.log('retornando data: '+user)

                if (!user)
                    return done(null, false, { message: 'Usuario no encontrado' });

                bcrypt.compare(password, user.password, function(err, res) {
                    if (err) {
                        console.log('ERR: -> ' + err)
                    }
                    if (res) {
                        const payload = {
                            Usuario: {
                                email: user.email,
                                nombre: user.nombre,
                                username: user.username,
                                permisos: user.permisos,
                                picture: user.picture
                            }
                        }
                        const token = jwt.sign(payload, SECRET_TOKEN, {
                            expiresIn: 30
                        })
                        fechaActual = fecha.hoyFecha()
                        User.update({ "_id": user._id }, { $set: { lastLogin: fechaActual } }, (err, todo) => {
                            // Handle any possible database errors
                            if (err) return res.status(500).send(err);

                            return done(null, user, { message: 'Login exitoso', token: token });
                        })

                    } else {
                        // response is OutgoingMessage object that server response http request
                        return done(null, false, { message: 'Contraseña incorrecta' });
                    }
                })
            })
        } catch (error) {
            return done(err)
        }
    }
))

function addUser(req, res) {
    console.log('Request from: https://localhost:8000/API/ProSalud/User/a')

    User.findOne({ username: req.body.username }, function callback(error, user) {
        if (user) {
            res.status(401).json({ code: 1, message: "El usuario ya existe" })
        } else {
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
                userModel.save((err, userStored) => {
                    if (err) res.status(500).send({ message: "Error al guardar usuario" })

                    res.status(200).send({ message: "Usuario guardado exitosamente" })
                })
            } catch (e) {
                console.log(e)
            }
        }
    })
}

function modify(req, res) {

}

function delet(req, res) {

}

module.exports = {
    addUser,
    modify,
    delet
}