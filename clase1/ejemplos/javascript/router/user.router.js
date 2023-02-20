const { Router } = require('express')
const router = Router()

const controller = require('../controller/user')
const jwt = require('../middleware/validation')

router.route('/')
    .get(controller.hello)
    .post(jwt.validate_token, jwt.admin, controller.add)
    .delete(jwt.validate_token, jwt.admin, controller.delete_all)

module.exports = router