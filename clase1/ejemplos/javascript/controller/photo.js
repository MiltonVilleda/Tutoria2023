require('../config/mongo')
const photo = require('../models/photo')
const controller = require('./user')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req,file,callBack)=>{
        callBack(null,'images')
    },
    filename: (req,file,callBack)=>{
        callBack(null,`photo-${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({storage:storage}).single('file')

controller.add = async (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(400).send({ response: 'Error al cargar el archivo!'})
        }
        //console.log(req.file.filename)
        const newPhoto = new photo({ name: req.file.filename })
        await newPhoto.save()
        return res.status(200).send({ mensaje: true})
    })
}

controller.getAll = async (req, res) => {
    const photos = await photo.find()
    return res.status(200).send(photos)
}

controller.getOne = async (req, res) => {
    const fileName = req.query.fileName
    let path_file = path.join(__dirname, '..', 'images', fileName)

    fs.readFile(path_file, function(err, content) {
        if (err) {
            console.log(err)
            res.writeHead(400, { 'Content-type': 'text/html' })
            res.end('<h1>Error al devolver imagen</h1>')
        } else {
            if (fileName.endsWith('jpg') || fileName.endsWith('jpeg')) {
                res.writeHead(200, { 'Content-type': 'image/jpeg' })
            } else if (fileName.endsWith('png')) {
                res.writeHead(200, { 'Content-type': 'image/png' })
            }
            res.end(content)
        }
    })
}

module.exports = controller