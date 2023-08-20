const { Router } = require('express')
const router = Router()

const controller = require('../controller/test')

router.route('/:num')
    .get(controller.armstrong)

module.exports = router