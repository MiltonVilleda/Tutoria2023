const { Schema, model } = require('mongoose');

const producto_schema = new Schema({
    name: String,
    precio: Number,
    marca: String,
    /*name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }*/
    _categoria: Schema.Types.ObjectId
}/*, {
    timestamp: true
}
*/);

module.exports = model('producto', producto_schema);