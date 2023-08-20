const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')

const app = express()

app.set('port', 3001)

app.options('*', cors())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//jwt
app.use("/api/categoria", require('./router/categoria.router'))
/*
//jwt
app.use("/api/producto", require('./router/producto.router'))
app.use("/api/login", require('./router/login.router'))
//jwt
app.use("/api/user", require('./router/user.router'))
app.use("/api/admin", require('./router/admin.router'))

app.use("/api/test", require('./router/test.router'))

app.use("/api/curso", require('./router/curso.router'))

app.use("/api/foro", require('./router/foro.router'))

app.use("/api/photos", require('./router/photos.router'))
*/

module.exports = app