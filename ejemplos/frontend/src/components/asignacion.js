import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Asignacion(props) {
    const [cursos, setCursos] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        async function load() {
            let res = await axios.get(`http://localhost:3001/clase1/curso/644c938c01b2c1c14a17ebc2`)
            setName(res.data.name)
            setCursos(res.data.cursos)
        }
        load()
    }, [false])

    function print() {
        console.log(`nombre: ${name}`)
        console.log(cursos)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card p-3 mt-5 mb-5">
                        <div className="card-header">
                            <h1 className="text-center">Cursos asignados: {name}</h1>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <ul className="list-group mb-2 mt-2">
                                    {
                                        cursos.map(curso =>
                                            <li className="list-group-item" key={curso._id}>
                                                {curso.name}
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-primary" onClick={() => print()}>
                                print
                            </button>
                            <Link className="btn btn-primary" to='/'>
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}