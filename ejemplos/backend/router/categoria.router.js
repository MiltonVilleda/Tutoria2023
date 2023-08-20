const { Router } = require('express')
const router = Router()

const controller = require('../controller/categoria')
//const jwt = require('../middleware/validation')

router.route('/hello')
    .get(controller.hello)

router.route('/')
    .get(controller.find_any)
    .post(controller.add)
    .delete(controller.delete_any)
    /*.get(jwt.validate_token, controller.find_any)
    .post(jwt.validate_token, jwt.admin, controller.add)
    .delete(jwt.validate_token, jwt.admin, controller.delete_any)*/

router.route('/delete/:id')
    .delete(controller.delete)

//url params
router.route('/findv0/:id')
    //.get(jwt.validate_token, controller.find_onev0)
    .get(controller.find_onev0)

router.route('/findv1/:id')
    //.get(jwt.validate_token, controller.find_onev1)
    .get(controller.find_onev1)

//query string
router.route('/findv2')
    //.get(jwt.validate_token, controller.find_onev2)
    .get(controller.find_onev2)

module.exports = router