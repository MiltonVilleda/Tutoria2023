const { Router } = require('express')
const router = Router()

const controller = require('../controller/test')

router.route('/')
    .post(controller.add)

module.exports = router