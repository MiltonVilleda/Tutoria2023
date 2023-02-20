const { Schema, model } = require('mongoose');

const admin_schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true
    }
})

module.exports = model('admin', admin_schema);