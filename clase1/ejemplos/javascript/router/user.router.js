const { Router } = require('express')
const router = Router()

const controller = require('../controller/user')
const jwt = require('../middleware/validation')

router.route('/')
    .get(controller.hello)
    /*.post(jwt.validate_token, jwt.admin, controller.add)
    .delete(jwt.validate_token, jwt.admin, controller.delete_all)*/
    .post(controller.add)
    .delete(controller.delete_all)

router.route('/cart')
    .post(controller.addOneToCart)
    .put(controller.updateCart)

router.route('/buy')
    .post(controller.buy)

router.route('/bills/:id_user')
    .get(controller.get_bills)

router.route('/bill/:id_user/:id_bill')
    .get(controller.get_bill)

module.exports = router