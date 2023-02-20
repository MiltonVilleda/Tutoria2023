const jwt = require('jsonwebtoken');
const user = require('../models/user');
const admin = require('../models/admin');

const controller = {}

controller.user_login = async (req, res) => {
    const data = req.body
    try {
        const user_ = await user.findOne(
            { name: data.name, pw: data.pw }
        )
        if (!user_) {
            return res.status(400).send({ message: 'user not found' })
        } else {
            console.log(user_)
            for (let gusto of user_.gustos) {
                console.log(`Gusto: ${gusto}`)
            }
            const id = user_._id.toHexString()
            console.log(id)
            const token = jwt.sign(
                { 
                    data: {
                        id: id,
                        tipo: "USER"
                    }
                },
                'clase1',
                { expiresIn: '1h' },
                { algorithm: 'RS256' }
            )
            return res.status(200).send({ token: token })
        }
    } catch (error) {
        return res.status(400).send({ message: 'error' })
    }
}

controller.admin_login = async (req, res) => {
    const data = req.body
    try {
        const admin_ = await admin.findOne(
            { name: data.name, pw: data.pw }
        )
        if (!admin_) {
            return res.status(400).send({ message: 'admin not found' })
        } else {
            console.log(admin_)
            const id = admin_._id.toHexString()
            console.log(id)
            const token = jwt.sign(
                { 
                    data: {
                        id: id,
                        tipo: "ADMIN"
                    }
                },
                'clase1',
                { expiresIn: '1h' },
                { algorithm: 'RS256' }
            )
            return res.status(200).send({ token: token })
        }
    } catch (error) {
        return res.status(400).send({ message: 'error' })
    }
}

module.exports = controller