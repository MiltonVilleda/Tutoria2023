require('../config/mongo')
const categoria = require('../models/categoria')
const producto = require('../models/producto')

const controller = {}

controller.hello = async (req, res) => {
    return res.status(200).send({ response: "hello world"})
}

controller.find_any = async (req, res) => {
    const categorias = await categoria.find()
    return res.status(200).send(categorias)
}

controller.find_onev0 = async (req, res) => {
    const id = req.params.id
    try {
        const categorias = await categoria.findById(id)
        return res.status(200).send(categorias)
    } catch (error) {
        return res.status(200).send([{ }])
    }
}

controller.find_onev1 = async (req, res) => {
    const id = req.params.id
    try {
        const categorias = await categoria.find(
            { _id: id }
        )
        return res.status(200).send(categorias)
    } catch (error) {
        return res.status(200).send([{ }])
    }
}

controller.find_onev2 = async (req, res) => {
    const name = req.query.name
    try {
        const categorias = await categoria.find(
            { name: name }
        )
        return res.status(200).send(categorias)
    } catch (error) {
        return res.status(200).send([{ }])
    }
}

controller.add = async (req, res) => {
    const data = req.body
    try {
        const category = new categoria(data);
        await category.save();
        return res.status(200).send({ message: 'Categoria creada!'})
    } catch (error) {
        return res.status(400).send({ message: 'Error al agregar!'})
    }
}

controller.delete_any = async (req, res) => {
    await categoria.deleteMany()
    return res.status(200).send({ message: 'Categorias eliminadas!'})
}

controller.delete = async (req, res) => {
    try {
        const id = req.params.id
        //get default category
        //find = [ {}, {}, ...]
        //findOne = {}
        const default_categoria = await categoria.findOne(
            { name: "default" }
        )
        const _id_default = default_categoria._id.toHexString()
        //update productos
        await producto.updateMany(
            { _categoria: id },
            { $set: { _categoria: _id_default } }
        )
        //delete category
        await categoria.deleteOne(
            { _id: id }
        )
        return res.status(200).send({ message: 'Categoria eliminada!'})
    } catch (error) {
        return res.status(200).send({ message: 'Error al eliminar'})
    }
}

module.exports = controller