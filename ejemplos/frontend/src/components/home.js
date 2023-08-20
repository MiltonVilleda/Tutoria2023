import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Home(props) {

    const [usr, setUsr] = useState('')
    const [pwd, setPwd] = useState('')
    const navigate = useNavigate()

    const OnSubmit = async(e) => {
        e.preventDefault()

        if (usr && pwd) {
            try {
                let res = await axios.post('http://localhost:3001/clase1/login/user',
                    {
                        name: usr,
                        pw: pwd
                    }
                )
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                navigate('/user', { replace:true })
            } catch (error) {
                alert('Usuario no encontrado')
                setUsr('')
                setPwd('')
            }
        } else {
            alert('Llene todos los campos')
        }
    }

    return (
            <div className="container">
                <div className="row mt-5 justify-content-center align-middle">
                    <div className="col-6 p-5">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="text-center">Login</h1>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <label htmlFor="f1" className="form-label">Usuario</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" id="f1" autoComplete="off" onChange={e => setUsr(e.target.value)} value={usr}/>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="f1" className="form-label">Contraseña</label>
                                        </div>
                                        <div className="col-6">
                                            <input type="password" className="form-control" id="f1" autoComplete="off" onChange={e => setPwd(e.target.value)} value={pwd}/>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 mt-3">
                                        <button onClick={OnSubmit} className="btn btn-primary">Ingresar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}