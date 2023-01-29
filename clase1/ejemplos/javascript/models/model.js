const { Schema, model } = require('mongoose');

const categoria_schema = new Schema({
    name: String/*
    name: {
        type: string,
        trim: true,
        required: true,
        unique: true
    }
    */
}/*, {
    timestamp: true
}
*/);

module.exports = model('categoria', categoria_schema);