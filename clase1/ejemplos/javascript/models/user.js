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
    },/*
    pago: {
        type: String,
        default: "estudiante",
    },
    grado: {
        type: String,
        default: "no aplica"
    },
    carnet: {
        type: Number,
        default: -1
    },*/
    gustos: [
        String
    ]
})

module.exports = model('user', user_schema);