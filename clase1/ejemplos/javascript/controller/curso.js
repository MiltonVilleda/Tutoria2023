require('../config/mongo')
const mongoose = require('mongoose')
const curso = require('../models/curso')
const student = require('../models/student')

const controller = {}

controller.find_any = async (req, res) => {
    const cursos = await curso.find()
    return res.status(200).send(cursos)
}

controller.addStudent = async (req, res) => {
    const data = req.body
    try {
        const new_student = new student(data);
        await new_student.save();
        return res.status(200).send({ message: 'Estudiante creado!'})
    } catch (error) {
        return res.status(400).send({ message: 'Error al agregar!'})
    }
}

controller.asignarCursos = async (req, res) => {
    const data = req.body
    //console.log(data.cursos)
    try {
        for (let id of data.cursos) {
            let _id = mongoose.Types.ObjectId(id)
            await student.updateOne(
                { _id: '644c938c01b2c1c14a17ebc2'},
                {
                    $push: {
                        cursos: { _curso: _id }
                    }
                }
            )
        }
        return res.status(200).send({ message: 'ok'})
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: 'Error al asignar'})
    }
    //return res.status(200).send({ message: 'ok'})
}

controller.getCursos = async (req, res) => {
    const id = req.params.id
    const result = await student.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        { $lookup: {
            from: "cursos",
            localField: "cursos._curso",
            foreignField: "_id",
            as: "cursos"
        }}
    ])
    console.log(result)
    if (result.length > 0) {
        return res.status(200).send(result[0])
    } else {
        return res.status(400).send({msg: 'error'})
    }
}

module.exports = controller