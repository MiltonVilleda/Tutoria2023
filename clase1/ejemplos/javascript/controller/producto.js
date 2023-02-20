require('../config/mongo')
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

controller.delete_any = async (req, res) => {
    await producto.deleteMany()
    return res.status(200).send({ message: 'Productos eliminados!'})
}

controller.get_specific1 = async (req, res) => {
    const productos = await producto.find(
        {},
        { name: 1, precio: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific2 = async (req, res) => {
    const productos = await producto.find(
        {},
        { _id: 0, name: 1, precio: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific3 = async (req, res) => {
    const productos = await producto.find(
        { marca: "Samsung" },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific4 = async (req, res) => {
    const productos = await producto.find(
        { marca: { $ne: "Samsung" } },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific5 = async (req, res) => {
    const productos = await producto.find(
        { precio: { $gte: 1500 } },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific6 = async (req, res) => {
    const productos = await producto.find(
        { precio: { $lte: 1500 } },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific7 = async (req, res) => {
    const productos = await producto.find(
        { marca: { $ne: "Samsung" }, precio: { $lt: 2000 } },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific8 = async (req, res) => {
    const productos = await producto.find(
        { $or: [ { marca: "Samsung" }, { marca: "Oster" } ], precio: { $lt: 2000 } },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific9 = async (req, res) => {
    const productos = await producto.find(
        { precio: { $gt: 300, $lt: 2000 } },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific10 = async (req, res) => {
    const productos = await producto.find(
        { name: /ra/ },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific11 = async (req, res) => {
    const productos = await producto.find(
        { name: /^S/ },
        { _id: 0, name: 1, precio: 1, marca: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific12 = async (req, res) => {
    const productos = await producto.find(
        {},
        { _id: 0, name: 1, precio: 1, marca: 1 }
    ).sort(
        { precio: 1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific13 = async (req, res) => {
    const productos = await producto.find(
        {},
        { _id: 0, name: 1, precio: 1, marca: 1 }
    ).sort(
        { precio: -1 }
    )
    return res.status(200).send(productos)
}

controller.get_specific14 = async (req, res) => {
    const contador = await producto.count()
    return res.status(200).send({ n_productos: contador })
}

controller.get_specific15 = async (req, res) => {
    const contador = await producto.count(
        { precio: { $lt: 1000 } }
    )
    return res.status(200).send({ n_productos: contador })
}

controller.get_specific16 = async (req, res) => {
    const productos = await producto.aggregate([ { $group: { _id: "$marca"} } ])
    return res.status(200).send(productos)
}

controller.get_specific17 = async (req, res) => {
    const productos = await producto.find().sort( { precio: -1 } ).limit(4)
    return res.status(200).send(productos)
}

controller.update_name = async (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const producto_updated = await producto.findOneAndUpdate(
        { _id: id },
        { $set: { name: name }, $inc: { precio: 20 } },
        { new: true }
    )
    return res.status(200).send(producto_updated)
}

module.exports = controller