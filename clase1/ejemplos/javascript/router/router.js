const { Router } = require('express')
//const jwt = require('../middleware/jwt')
const router = Router()

const controller = require('../controller/controller')

router.route('/hello')
    .get(controller.hello)

router.route('/')
    .get(controller.find_any)
    .delete(controller.delete_any)

router.route('/new')
    .post(controller.add)

module.exports = router