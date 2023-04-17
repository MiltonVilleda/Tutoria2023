import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Form(props) {

    const navigate = useNavigate()
    const [name, setName] = useState('')

    const OnSubmit = async(e) => {
        e.preventDefault()
        if (name) {
            let res = await axios.post('http://localhost:3001/clase1/categoria',
                {
                    name: name
                }
            )
            if (res.status === 200) {
                alert('Added')
                navigate('/view', { replace:true })
                //setName('')
            } else {
                alert('Error al crear')
            }
        } else {
            alert('Error: llene todos los campos')
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center align-middle mb-5">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Nueva categoria</h3>
                        </div>
                        <div className="card-body">
                            <div className="row p-3 justify-content-center">
                                <div className="col-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3700/3700434.png" className="img-fluid" alt="..." />
                                </div>
                            </div>
                            <form>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label htmlFor="f1" className="form-label">Nombre de la categoria</label>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" id="f1" autoComplete="off" onChange={e => setName(e.target.value)} value={name}/>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button onClick={OnSubmit} className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}