const { Router } = require('express')
//const jwt = require('../middleware/jwt')
const router = Router()

const controller = require('../controller/controller')

router.get('/hello', controller.hello)

module.exports = router