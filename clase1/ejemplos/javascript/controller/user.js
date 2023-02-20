const controller = {}
const user = require('../models/user')

controller.hello = async (req, res) => {
    //return res.status(200).send({ response: "hello user!"})
    const users = await user.find()
    return res.status(200).send(users)
}

controller.add = async (req, res) => {
    const data = req.body
    try {
        const new_user = new user(data);
        await new_user.save();
        return res.status(200).send({ message: 'Usuario creado!'})
    } catch (error) {
        return res.status(400).send({ message: 'Error al agregar!'})
    }
}

controller.delete_all = async (req, res) => {
    await user.deleteMany()
    return res.status(200).send({ message: 'Usuarios eliminados!'})
}

module.exports = controller