const { Router } = require('express')
//const jwt = require('../middleware/jwt')
const router = Router()

const controller = require('../controller/categoria')

router.route('/hello')
    .get(controller.hello)

router.route('/')
    .get(controller.find_any)
    .delete(controller.delete_any)

//url params
router.route('/findv0/:id')
    .get(controller.find_onev0)

router.route('/findv1/:id')
    .get(controller.find_onev1)

//query string
router.route('/findv2')
    .get(controller.find_onev2)

router.route('/new')
    .post(controller.add)

module.exports = router