const { Schema, model } = require('mongoose');

const test_schema = new Schema({
    name: String,
    numeros: {
        type: [{
            type: Number,
        }],
        validate: [
            { validator: arrayLimit, msg: '{PATH} exceeds the limit of 2' },
            { validator: element, msg: '{PATH} elements duplicated' }
        ]
    }
})

function arrayLimit(val) {
    return val.length <= 2;
}

function element(val) {
    for (let i = 0; i < val.length; i++) {
        if (val[i] == val[i + 1]){
            return false
        }
    }
    return true
}

module.exports = model('test', test_schema);