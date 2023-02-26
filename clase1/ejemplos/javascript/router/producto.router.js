const { Router } = require('express')
const router = Router()

const controller = require('../controller/producto')
const jwt = require('../middleware/validation')

router.route('/')
    .get(controller.find_any)
    .post(controller.add)
    .delete(controller.delete_any)
    /*.get(jwt.validate_token, controller.find_any)
    .post(jwt.validate_token, jwt.admin, controller.add)
    .delete(jwt.validate_token, jwt.admin, controller.delete_any)*/

router.route('/detail')
    .get(controller.find_detail)
    //.get(jwt.validate_token, controller.find_detail)

router.route('/specific1')
    .get(controller.get_specific1)

router.route('/specific2')
    .get(controller.get_specific2)

router.route('/specific3')
    .get(controller.get_specific3)

router.route('/specific4')
    .get(controller.get_specific4)

router.route('/specific5')
    .get(controller.get_specific5)

router.route('/specific6')
    .get(controller.get_specific6)

router.route('/specific7')
    .get(controller.get_specific7)

router.route('/specific8')
    .get(controller.get_specific8)

router.route('/specific9')
    .get(controller.get_specific9)

router.route('/specific10')
    .get(controller.get_specific10)

router.route('/specific11')
    .get(controller.get_specific11)

router.route('/specific12')
    .get(controller.get_specific12)

router.route('/specific13')
    .get(controller.get_specific13)

router.route('/specific14')
    .get(controller.get_specific14)

router.route('/specific15')
    .get(controller.get_specific15)

router.route('/specific16')
    .get(controller.get_specific16)

router.route('/specific17')
    .get(controller.get_specific17)

router.route('/update/:id')
    .put(jwt.validate_token, jwt.admin, controller.update_name)

router.route('/addStock')
    .post(controller.addStock)

router.route('/sold_out')
    .get(controller.sold_out)

router.route('/best_seller')
    .get(controller.best_seller)

module.exports = router