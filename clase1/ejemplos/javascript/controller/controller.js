require('../config/mongo')
const categoria = require('../models/model')

const controller = {}

controller.hello = async (req, res) => {
    return res.status(200).send({ response: "hello world"})
}

controller.find_any = async (req, res) => {
    const categorias = await categoria.find()
    return res.status(200).send(categorias)
}

controller.add = async (req, res) => {
    const data = req.body
    const category = new categoria(data);
    await category.save();
    return res.status(200).send({ message: 'Categoria creada!'})
}

controller.delete_any = async (req, res) => {
    await categoria.deleteMany()
    return res.status(200).send({ message: 'Categorias eliminadas!'})
}

module.exports = controller