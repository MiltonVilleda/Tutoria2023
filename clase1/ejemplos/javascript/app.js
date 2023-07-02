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
app.use("/clase1/categoria", require('./router/categoria.router'))
//jwt
app.use("/clase1/producto", require('./router/producto.router'))
app.use("/clase1/login", require('./router/login.router'))
//jwt
app.use("/clase1/user", require('./router/user.router'))
app.use("/clase1/admin", require('./router/admin.router'))

app.use("/clase1/test", require('./router/test.router'))

app.use("/clase1/curso", require('./router/curso.router'))

app.use("/clase1/foro", require('./router/foro.router'))

app.use("/clase1/photos", require('./router/photos.router'))

module.exports = app