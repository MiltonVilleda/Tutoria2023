const { Router } = require('express')
const router = Router()

const controller = require('../controller/curso')

router.route('/')
    .get(controller.find_any)
    .post(controller.addStudent)

router.route('/asignar')
    .post(controller.asignarCursos)

router.route('/:id')
    .get(controller.getCursos)

module.exports = router