const { Schema, model } = require('mongoose');

const student_schema = new Schema({
    name: String,
    cursos: [
        {
            _curso: {
                type: Schema.Types.ObjectId,
                ref: 'cursos'
            }
        }
    ]
});

module.exports = model('student', student_schema);