const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

const mongodb_uri = process.env.URI || 'mongodb://127.0.0.1:27017/test'

mongoose.connect(mongodb_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(db => console.log('Conectado a mongodb'))
.catch(err => console.log(err))