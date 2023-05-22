const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('pdfmake/build/vfs_fonts')
pdfMake.vfs = pdfFonts.pdfMake.vfs
const fs = require('fs')
const controller = {}
const categoria = require('../models/categoria')
const producto = require('../models/producto')
const user = require('../models/user')
const path = require('path')

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
    //const categorias = await categoria.find()
    //const productos = await producto.find()

    let factura_arr = []
    for (let bill of usr.facturas) {
        //console.log("Factura")
        //console.log(bill)
        let bill_temp = {
            _id: bill._id,
            fecha: bill.fecha,
            total: bill.total,
            productos: []
        }
        //console.log("productos")
        for (let item of bill.productos) {
            //console.log(item)
            //producto_ = productos.find(element => element._id.toHexString() == item._producto.toHexString())
            producto_ = await producto.findById(item._producto)
            //console.log(producto_)
            //categoria_ = categorias.find(element => element._id.toHexString() == producto_._categoria.toHexString())
            categoria_ = await categoria.findById(producto_._categoria)
            //console.log(categoria_)
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

controller.get_bill = async (req, res) => {
    const user_id = req.params.id_user
    const bill_id = req.params.id_bill
    let detail = {
        fecha: '',
        total: '',
        productos: []
    }
    let body = [
        [{ text: 'Descripcion', style: 'tableHeader', colSpan: 4 },{},{},{}],
        [
            { text: 'Cantidad', alignment: 'center' },
            { text: 'Producto', alignment: 'center' },
            { text: 'Precio', alignment: 'center' },
            { text: 'Subtotal', alignment: 'center' },
        ]
    ]
    const usr = await user.findById(user_id)
    let facturas = usr.facturas
    const bill = facturas.find(item => item._id == bill_id)
    //console.log(bill)
    detail.fecha = bill.fecha
    detail.total = bill.total
    for (let item of bill.productos) {
        //console.log('Item')
        //console.log(item)
        producto_ = await producto.findById(item._producto)
        //console.log(producto_)
        categoria_ = await categoria.findById(producto_._categoria)
        //console.log(categoria_)
        detail.productos.push(
            {
                name: producto_.name,
                precio: producto_.precio,
                marca: producto_.marca,
                categoria: categoria_.name,
                cantidad: item.cantidad,
                sub_total: item.cantidad*producto_.precio
            }
        )
        body.push(
            [
                { text: item.cantidad, alignment: 'center' },
                `${producto_.name} - ${producto_.marca}`,
                { text: producto_.precio, alignment: 'center' },
                { text: item.cantidad*producto_.precio, alignment: 'center' },
            ]
        )
    }
    body.push([{ text: 'Total', style: 'tableHeader', colSpan: 3 },{},{},{ text: bill.total, alignment: 'center' }])
    let dd = {
        content: [
            { text: 'Factura', style: 'header', alignment: 'center' },
            { text: `No Factura: ${bill._id}`, style: 'subheader2' },
            { text: `Fecha: ${bill.fecha}`, style: 'subheader2' },
            {
                columns: [
                    {
                        style: 'tableExample',
                        table: {
                            body: body,
                            widths: [ '*', 'auto', 100, '*' ]
                        }
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            subheader2: {
                fontSize: 14,
                bold: false,
                margin: [0, 3, 0, 3]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                alignment: 'center',
                margin: [70, 0, 70, 0]
            }
        }
    }
    try {
        let buffer = await get_buffer(dd)
        fs.writeFileSync(`temp\\bill-${bill._id}.pdf`, buffer)
        //console.log(__dirname)
        let file_path = path.join(__dirname, '..', `\\temp\\bill-${bill._id}.pdf`)
        fs.readFile(file_path, function(err, content) {
            if (err) {
                console.log(err)
                res.writeHead(400, { 'Content-type': 'text/html' })
                res.end('<h1>Error al devolver factura</h1>')
            } else {
                res.writeHead(200, { 'Content-type': 'application/pdf' })
                res.end(content)
            }
        })
    } catch(error){
        console.log(error)
        return res.status(400).send({ msg: 'Error al crear factura' })
    }
}

get_buffer = (definition) => {
    return new Promise((resolve, reject) => {
        try{
            //pdfMake.createPdf(definition).getDataUrl
            //pdfMake.createPdf(docDefinition).getBase64
            pdfMake.createPdf(definition).getBuffer(function(buffer) {
                resolve(buffer)
            })
        } catch (error) {
            reject(null)
        }
    })
}

controller.getOne = async (req, res) => {
    const id = req.query.id
    try {
        const current_user = await user.findById(id)
        return res.status(200).send(current_user)
    } catch (error) {
        return res.status(400).send({ message: 'user not found'})
    }
}

module.exports = controller