'use strict'
const express = require('express')
const rutas = express.Router()
const userCtrl = require('../Controllers/Ctrl_USER')
const passport = require('passport')
const rutasProtegidas = require('../Middlewares/rutasProtegidas.js')
rutas.get('/', (req,res)=>{
	console.log(req.sessionID)
	res.status(200).send({message:'Ingreso a la API exitosamente'})
})

rutas.get('/token', rutasProtegidas.rutasProtegidas, (req, res) => {
 const datos = [
  { id: 1, nombre: "Asfo" },
  { id: 2, nombre: "Denisse" },
  { id: 3, nombre: "Carlos" }
 ];
 
 res.json(datos);
})

rutas.post('/User/a',userCtrl.addUser)
rutas.post('/auth', (req,res,next)=>{
    passport.authenticate('local_login',
    {session:false},
    (err,user,info)=>{
        //INICIA UNA VARIABLE DE SESION PARA EL LOGIN, PERO EN ESTE CASO CREAEL JWT
        req.login(user,{session:false}, err=>{
            if(err) res.status(401).json({message:'Fallo en inicio de sesion'});

            if(!user)
            	return res.status(401).json({message: info.message})
            else
            return res.status(200).json({message:'inicio de sesion exitoso', token: info.token});
        });
    })(req, res);
});

module.exports = rutas
