const { Schema, model } = require('mongoose');

const curso_schema = new Schema({
    name: String
})

module.exports = model('curso', curso_schema);