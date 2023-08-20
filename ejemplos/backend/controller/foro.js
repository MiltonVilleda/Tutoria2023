const mongoose = require('mongoose')
const foro = require('../models/foro');
const controller = {}

controller.newForo = async (req, res) => {
    const data = req.body
    try {
        const new_foro = new foro(data)
        await new_foro.save()
        return res.status(200).send({ message: 'Foro creado!'})
    } catch (error) {
        return res.status(400).send({ message: 'Error al agregar!'})
    }
}

controller.getAll = async (req,res) => {
    try {
        const foros = await foro.find(
            {}, { name: 1 }
        )
        return res.status(200).send(foros)
    } catch (error) {
        return res.status(400).send({ message: 'Error al obtener foros!'})
    }
}

controller.getOne = async (req, res) => {
    const id = req.params.id
    try {
        let currentForo = await foro.findById(id, { _id: 1, name: 1 })
        return res.status(200).send(currentForo)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: 'Error al obtener un foro!'})
    }
}

controller.getComments = async (req, res) => {
    const id = req.query.id
    try {
        let forosResult = await foro.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            { $unwind: "$comments" },
            { $lookup: {
                from: "users",
                localField: "comments._user",
                foreignField: "_id",
                as: "comments._user"
            }},
            { $unwind: "$comments._user" },
            { $project: {
                "comments._id": 1,
                "comments.fecha": 1,
                "comments.comment": 1,
                "comments._user._id": 1,
                "comments._user.name": 1
            }}
        ])
        let currentForo = []
        for (let n of forosResult){
            let aux = n.comments
            currentForo.push({
                comment: aux.comment,
                fecha: aux.fecha,
                _id: aux._id,
                _user: aux._user._id,
                name: aux._user.name
            })
        }
        console.log(currentForo)
        return res.status(200).send(currentForo)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: 'Error al obtener comentarios!'})
    }
}

controller.comment = async (req, res) => {
    const data = req.body
    try {
        const _id = data._id
        await foro.updateOne(
            { _id: _id },
            {
                $push: {
                    comments: {
                        _user: data._user,
                        comment: data.comment
                    }
                }
            }
        )
        return res.status(200).send({ message: 'ok'})
    } catch (error) {
        return res.status(400).send({msg: 'Error al comentar'})
    }
}

module.exports = controller