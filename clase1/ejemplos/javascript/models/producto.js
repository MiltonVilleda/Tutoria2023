const { Schema, model } = require('mongoose');

const producto_schema = new Schema({
    name: String,
    precio: Number,
    marca: String,
    stock: {
        type: Number,
        default: 0
    },
    ventas: {
        type: Number,
        default: 0
    },
    /*name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }*/
    _categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias'
    }
}/*, {
    timestamp: true
}
*/);

module.exports = model('producto', producto_schema);