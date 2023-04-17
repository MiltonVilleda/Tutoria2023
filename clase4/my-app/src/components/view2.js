import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Form(props) {
    const [categorias, setCategoria] = useState([])
    const [change, setChange] = useState(false)
    const [id, setId] = useState(-1)
    const [name, setName] = useState('')

    useEffect(() => {
        async function load() {
            let res = await axios.get('http://localhost:3001/clase1/categoria')
            setCategoria(res.data)
            console.log(categorias)
        }
        load()
    }, [change])

    async function onDelete(id) {
        let res = await axios.delete(`http://localhost:3001/clase1/categoria/delete/${id}`)
        if (res.status === 200) {
            alert('Eliminado correctamente')
            setChange(!change)
        } else {
            alert('Error al eliminar')
        }
    }

    function setData(id, name) {
        setId(id)
        setName(name)
    }

    async function onUpdate(e) {
        e.preventDefault()
        console.log(id)
        console.log(name)
    }

    return (
        <div>
            <div className="container">
                <div className="row mt-5 justify-content-center align-middle mb-5">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Resultado</th>
                                            <th scope="col" className="text-center">Update</th>
                                            <th scope="col" className="text-center">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categorias.map(categoria =>
                                                <tr key={categoria._id}>
                                                    <td>
                                                        {categoria.name}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <button type="button" className="btn btn-warning btn-sm m-1" data-bs-toggle="modal" data-bs-target="#update" onClick={() => setData(categoria._id, categoria.name)}>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <button type="button" className="btn btn-warning btn-sm m-1" onClick={() => onDelete(categoria._id)}>
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="update" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label htmlFor="f1" className="form-label">Nombre de la categoria</label>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" id="f1" autoComplete="off" onChange={e => setName(e.target.value)} value={name} />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update" onClick={onUpdate}>Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}