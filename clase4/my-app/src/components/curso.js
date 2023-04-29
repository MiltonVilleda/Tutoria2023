import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Curso(props) {
    const [cursos, setCursos] = useState([])
    const [change, setChange] = useState(false)
    const [asignacion, setAsignacion] = useState([])
    const navigate = useNavigate()

    function addCurso(id, name){
        const found = asignacion.find(x => x.id == id)
        if (!found) {
            setAsignacion([...asignacion,
                {
                    id: id,
                    name: name
                }
            ])
        }
    }

    async function asignar() {
        if (asignacion.length > 0) {
            //arreglo aux
            let asignar = []
            for (let curso of asignacion) {
                asignar.push(curso.id)
            }
            console.log(asignar)
            let res = await axios.post('http://localhost:3001/clase1/curso/asignar', {cursos: asignar})
            if (res.status === 200) {
                alert('Asignacion completada')
                navigate('/asignacion', { replace:true })
            } else {
                alert('Error al crear')
            }
        } else {
            alert('Error, debe asignar cursos')
        }
    }

    useEffect(() => {
        async function load() {
            let res = await axios.get('http://localhost:3001/clase1/curso')
            setCursos(res.data)
        }
        load()
    }, [change])

    return (
        <div className="container">
            <div className="card p-3 mt-5 mb-5">
                <div className="card-header">
                    <h1 className="text-center">Listado de cursos</h1>
                </div>
                <div className="row justify-content-center align-middle">
                    {
                        cursos.map(curso =>
                            <div className="col-4 p-2" key={curso._id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <p className="text-center">{curso.name}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-grid gap-2">
                                            <button type="button" className="btn btn-primary btn-sm m-1" onClick={() => addCurso(curso._id, curso.name)}>Asignar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h2 className="text-center">Cursos asignados</h2>
                    </div>
                    <div className="col-12">
                        <ul className="list-group mb-2">
                            {
                                asignacion.map(curso =>
                                    <li className="list-group-item" key={curso.id}>
                                        {curso.name}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary btn-sm m-1" onClick={() => asignar()}>Asignar cursos</button>
                </div>
            </div>
        </div>
    )
}