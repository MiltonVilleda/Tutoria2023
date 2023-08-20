import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Form(props) {
    const [categorias, setCategoria] = useState([])
    const [change, setChange] = useState(false)
    const [id, setId] = useState(-1)
    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')

    useEffect(() => {
        async function load() {
            //let res = await axios.get('http://api:3001/api/categoria')
            let res = await axios.get('http://localhost:3001/api/categoria')
            setCategoria(res.data)
        }
        load()
    }, [change])

    async function onNew(e) {
        e.preventDefault()
        try {
            //let res = await axios.post(`http://api:3001/api/categoria`, { name: newName })
            let res = await axios.post(`http://localhost:3001/api/categoria`, { name: newName })
            alert('Category created!')
            setChange(!change)
        } catch (error) {
            alert('Error creating category')
        }
        setNewName('')
    }

    async function onDelete(id) {
        try {
            //let res = await axios.delete(`http://api:3001/api/categoria/delete/${id}`)
            let res = await axios.delete(`http://localhost:3001/api/categoria/delete/${id}`)
            alert('Category deleted')
            setChange(!change)
        } catch (error) {
            alert('Error deleting category')
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
        alert(`TODO: update name to ${name}`)
    }

    return (
        <div>
            <div className="container">
                <div className="row mt-5 justify-content-center align-middle">
                    <div className="col-2">
                        <button type="button" className="btn btn-primary btn-sm m-1"
                            data-bs-toggle="modal" data-bs-target="#new">
                            New category <i className="bi bi-plus-circle"></i>
                        </button>
                    </div>
                </div>
                <div className="row mt-3 justify-content-center align-middle mb-5">
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
            <div className="modal fade" id="new" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label htmlFor="f1" className="form-label">Nombre de la categoria</label>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" id="f1" autoComplete="off" onChange={e => setNewName(e.target.value)} value={newName} />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new"
                                    onClick={onNew}>Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="update" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update category</h1>
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