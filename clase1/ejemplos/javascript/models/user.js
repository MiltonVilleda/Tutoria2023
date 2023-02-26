const { Schema, model } = require('mongoose');

const user_schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true
    },
    carrito: [
        {
            _producto: Schema.Types.ObjectId,
            cantidad: Number
        }
    ],
    facturas: [
        {
            fecha: {
                type: Date,
                default: Date.now()
            },
            productos: [
                {
                    _producto: {
                        type: Schema.Types.ObjectId,
                        ref: 'productos'
                    },
                    cantidad: Number
                }
            ],
            total: Number
        }
    ]
})

module.exports = model('user', user_schema);