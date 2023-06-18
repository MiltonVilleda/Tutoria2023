const { Router } = require('express')
const router = Router()

const controller = require('../controller/foro')

router.route('/')
    .get(controller.getAll)
    .post(controller.newForo)

router.route('/one/:id')
    .get(controller.getOne)

router.route('/comments')
    .get(controller.getComments)
    .post(controller.comment)

module.exports = router