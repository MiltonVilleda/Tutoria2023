require('../config/mongo')
const test = require('../models/test')

const controller = {}

controller.add = async (req, res) => {
    const data = req.body
    try {
        const new_test = new test(data)
        await new_test.save()
        return res.status(200).send(new_test)
    } catch (error) {
        console.log(error)
        return res.status(400).send({msg: 'error'})
    }
}

module.exports = controller