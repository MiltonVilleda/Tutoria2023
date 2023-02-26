const controller = {}
const categoria = require('../models/categoria')
const producto = require('../models/producto')
const user = require('../models/user')

controller.hello = async (req, res) => {
    //return res.status(200).send({ response: "hello user!"})
    const users = await user.find()
    return res.status(200).send(users)
}

controller.add = async (req, res) => {
    const data = req.body
    try {
        const new_user = new user(data);
        await new_user.save();
        return res.status(200).send({ message: 'Usuario creado!'})
    } catch (error) {
        return res.status(400).send({ message: 'Error al agregar!'})
    }
}

controller.delete_all = async (req, res) => {
    await user.deleteMany()
    return res.status(200).send({ message: 'Usuarios eliminados!'})
}

controller.addOneToCart = async (req, res) => {
    const id_user = req.body.id_user
    const id_producto = req.body.id_producto
    const current_user = await user.findOne(
        { _id: id_user, 'carrito._producto': id_producto }
    )
    if (!current_user) {
        await user.updateOne(
            { _id: id_user },
            { $push: {
                carrito: {
                    _producto: id_producto,
                    cantidad: 1
                }
            } }
        )
        return res.status(200).send({ message: 'Nuevo producto agregado!'})
    } else {
        await user.updateOne(
            { _id: id_user },
            { $inc: { "carrito.$[element].cantidad": 1 } },
            { arrayFilters: [ { "element._producto": id_producto } ] }
        )
        return res.status(200).send({ message: 'Producto agregado!'})
    }
}

controller.updateCart = async (req, res) => {
    const id_user = req.body.id_user
    const id_producto = req.body.id_producto
    const cantidad = req.body.cantidad
    if (cantidad > 0) {
        await user.updateOne(
            { _id: id_user },
            { $set: { "carrito.$[element].cantidad": cantidad } },
            { arrayFilters: [ 
                { "element._producto": id_producto }
             ] }
        )
        return res.status(200).send({ message: 'Producto actualizado!'})
    } else {
        await user.updateOne(
            { _id: id_user },
            { $pull: { carrito: { _producto: id_producto } } }
        )
        return res.status(200).send({ message: 'Producto eliminado!'})
    }
}

controller.buy = async (req, res) => {
    const id_user = req.body.id_user
    //findById = {}
    const current_user = await user.findById(id_user)
    let carrito = current_user.carrito
    let factura = []
    let total = 0
    for (let item of carrito){
        //actualizar stock y ventas del producto
        let compra = await producto.findOneAndUpdate(
            { _id: item._producto.toHexString(), stock: { $gte: item.cantidad } },
            {
                $inc: { stock: - item.cantidad, ventas: item.cantidad }
            },
            { new: true }
        )
        if (compra) {
            //remover producto del carrito
            await user.updateOne(
                { _id: id_user },
                { $pull: { carrito: { _producto: item._producto } } }
            )
            //agregar a factura
            factura.push(
                {
                    _producto: item._producto.toHexString(),
                    cantidad: item.cantidad
                }
            )
            total += item.cantidad*compra.precio
        }
    }
    await user.updateOne(
        { _id: id_user },
        { $push: {
            facturas: {
                productos: factura,
                total: total
            }
        } }
    )
    console.log(factura)
    console.log(total)
    return res.status(200).send({ message: 'Compra realizada!'})
}

controller.get_bills = async (req, res) => {
    const id_user = req.params.id_user
    const usr = await user.findById(id_user)
    const categorias = await categoria.find()
    const productos = await producto.find()

    let factura_arr = []
    for (let bill of usr.facturas) {
        /*console.log("Factura")
        console.log(bill)*/
        let bill_temp = {
            fecha: bill.fecha,
            total: bill.total,
            productos: []
        }
        //console.log("productos")
        for (let item of bill.productos) {
            //console.log(item)
            producto_ = productos.find(element => element._id.toHexString() == item._producto.toHexString())
            categoria_ = categorias.find(element => element._id.toHexString() == producto_._categoria.toHexString())
            bill_temp.productos.push(
                {
                    name: producto_.name,
                    precio: producto_.precio,
                    marca: producto_.marca,
                    categoria: categoria_.name,
                    cantidad: item.cantidad,
                    sub_total: item.cantidad*producto_.precio
                }
            )
        }
        factura_arr.push(bill_temp)
    }
    return res.status(200).send(factura_arr)
}

module.exports = controller