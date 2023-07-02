const { Schema, model } = require('mongoose');

const photo_schema = new Schema({
    name: String
}/*, {
    timestamp: true
}
*/);

module.exports = model('photo', photo_schema);