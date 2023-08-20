const controller = {}
const admin = require('../models/admin')

controller.add = async (req, res) => {
    const data = req.body
    try {
        const new_admin = new admin(data);
        await new_admin.save();
        return res.status(200).send({ message: 'Admin creado!'})
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: 'Error al agregar!'})
    }
}

module.exports = controller