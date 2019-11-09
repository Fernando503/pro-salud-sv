'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = Schema({
	email: {type: String, unique:true, lowercase:true},
	nombre: String,
	picture: String,
	username: String,
	password: {type: String, select:false},
	loginDate: {type: Date, default: Date.now()},
	lastLogin: Date,
	permisos: {type:String, enum: ['Administrador','Cliente','Trabajador','Usuario']},
})

UserSchema.pre('save', (next)=>{
	let user = this
	if(!user.isModified('password')) return next()

		bcrypt.genSalt(10, (err, salt)=>{
			if (err) return next()

				bcrypt.hash(user.password, salt, null, (err, hash)=>{
					if (err) return next(err)

						user.password = hash
					next()
				})
		})
})


module.exports = mongoose.model('Users', UserSchema)