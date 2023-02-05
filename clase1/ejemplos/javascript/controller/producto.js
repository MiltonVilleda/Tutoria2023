require('../config/mongo')
const categoria = require('../models/categoria')
const producto = require('../models/producto')

const controller = {}

controller.find_any = async (req, res) => {
    const productos = await producto.find()
    return res.status(200).send(productos)
}

controller.find_detail = async (req, res) => {
    const productos = await producto.aggregate([
        {
            $lookup: {
                /*from: 'coleccion a la que se hace el join',
                localField: 'campo de llave foranea',
                foreignField: 'llave primaria en la coleccion para hacer el join',
                as: 'nombre de la clave'*/
                from: "categorias",
                localField: "_categoria",
                foreignField: "_id",
                as: "_categoria"
            }
        }
    ])
    return res.status(200).send(productos)
}

controller.add = async (req, res) => {
    const data = req.body
    try {
        const product = new producto(data);
        await product.save();
        return res.status(200).send({ message: 'Producto creado!'})
    } catch (error) {
        return res.status(400).send({ message: 'Error al agregar!'})
    }
}

module.exports = controller