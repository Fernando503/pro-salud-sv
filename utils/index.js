'use strict'

const bcrypt = require('bcrypt')

module.exports = {
	encode(value){
		return bcrypt.hashSync(value, 512)
	}
}