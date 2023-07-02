const { Router } = require('express')
const router = Router()

const controller = require('../controller/photo')

router.route('/')
    .get(controller.getAll)
    .post(controller.add)

router.route('/one')
    .get(controller.getOne)

module.exports = router