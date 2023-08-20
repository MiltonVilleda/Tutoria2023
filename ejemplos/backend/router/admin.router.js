const { Router } = require('express')
const router = Router()

const controller = require('../controller/admin')

router.route('/')
    .post(controller.add)

module.exports = router