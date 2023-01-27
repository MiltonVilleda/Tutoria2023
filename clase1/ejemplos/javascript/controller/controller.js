//const db = require('../database/db')

const controller = {}

controller.hello = async (req, res) => {
    //console.log(req.body)
    return res.status(200).send({ response: "hello world :)"})
}

module.exports = controller