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
	permisos: {type:String, enum: ['Administrador','Medico','Enfermera','Usuario']},
})

const saltRounds = 512;

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds)
    }
    next()
})

module.exports = mongoose.model('Users', UserSchema)