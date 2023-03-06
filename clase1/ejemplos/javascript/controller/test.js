require('../config/mongo')
const test = require('../models/test')

const controller = {}

controller.armstrong = async (req, res) => {
    const num = req.params.num
    const potencia = num.length
    let contador = 0
    for (let x of num) {
        contador += x**potencia
    }
    if (contador == num) {
        return res.status(200).send({msg: `${num} es un numero de Armstrong`})
    } else {
        return res.status(200).send({msg: `${num} no es un numero de Armstrong, la suma es: ${contador}`})
    }
}

module.exports = controller