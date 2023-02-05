const { Router } = require('express')
//const jwt = require('../middleware/jwt')
const router = Router()

const controller = require('../controller/producto')

router.route('/')
    .get(controller.find_any)

router.route('/new')
    .post(controller.add)

router.route('/detail')
    .get(controller.find_detail)

module.exports = router