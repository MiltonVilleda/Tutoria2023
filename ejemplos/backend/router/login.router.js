const { Router } = require('express')
const router = Router()

const controller = require('../controller/login')
//const jwt = require('../middleware/validation')

router.route('/user')
    .post(controller.user_login)

router.route('/admin')
    .post(controller.admin_login)

router.route('/getToken')
    .get(controller.getToken)

module.exports = router