const { Schema, model } = require('mongoose');

const foro_schema = new Schema({
    name: String,
    comments: [
        {
            _user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            fecha: {
                type: Date,
                default: Date.now()
            },
            comment: String
        }
    ]
});

module.exports = model('foro', foro_schema);