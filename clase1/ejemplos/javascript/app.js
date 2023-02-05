const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
//const cors = require('cors')

const app = express()

/*
app.options('*', cors())
app.user(cors())
*/

app.set('port', 3001)

//app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/clase1/categoria",require('./router/categoria.router'))
app.use("/clase1/producto",require('./router/producto.router'))

module.exports = app