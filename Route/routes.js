'use strict'
const express = require('express')
const rutas = express.Router()
const userCtrl = require('../Controllers/Ctrl_USER')
const passport = require('passport')
const secury = require('../Middlewares/rutasProtegidas.js')
// para validar JWT:    secury.vJWT

rutas.post('/User/a', userCtrl.addUser)
rutas.post('/User/m', secury.vJWT, userCtrl.modify)
rutas.post('/User/d', secury.vJWT, userCtrl.delet)
rutas.post('/auth', (req, res, next) => {
    passport.authenticate('local_login', { session: false },
        (err, user, info) => {
            //INICIA UNA VARIABLE DE SESION PARA EL LOGIN, PERO EN ESTE CASO CREAEL JWT
            req.login(user, { session: false }, err => {
                if (err) res.status(401).json({ message: 'Fallo en inicio de sesion' });
                if (!user)
                    return res.status(401).json({ message: info.message })
                else
                    return res.status(200).json({ message: 'inicio de sesion exitoso', token: info.token });
            });
        })(req, res);
});

module.exports = rutas