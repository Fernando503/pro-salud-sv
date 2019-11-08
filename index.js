'use strict'
const app = require('./resources/app')
const config = require('./resources/config')

app.listen(config.port, ()=> {
	console.log(`Running in http://localhost:${config.port}`)
})