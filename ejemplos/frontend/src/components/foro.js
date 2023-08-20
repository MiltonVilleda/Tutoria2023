import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios'

export default function Foro(props) {
    const[searchParams, setParams] = useSearchParams()
    const[usr, setUsr] = useState('')
    const[foro, setForo] = useState({})
    const[comment, setComment] = useState('')
    const[comments, setComments] = useState([])
    const[change, setChange] = useState(false)

    //get user info
    useEffect(() => {
        async function getToken() {
            try {
                let token = localStorage.getItem('token')
                let res = await axios.get(`http://localhost:3001/clase1/login/getToken?token=${token}`)
                let token_result = res.data.data
                let res2 = await axios.get(`http://localhost:3001/clase1/user?id=${token_result.id}`)
                setUsr(res2.data)
            } catch (error) {
                alert('error user')
            }
        }

        getToken()
    }, [change])

    //get foro
    useEffect(() => {
        //get info from foro
        async function getForo() {
            try {
                let res = await axios.get(`http://localhost:3001/clase1/foro/one/${searchParams.get('id')}`)
                setForo(res.data)
            } catch (error) {
                console.log(error)
                alert('error foro')
            }
        }
        //get comments from foro
        async function getComments() {
            try {
                let res = await axios.get(`http://localhost:3001/clase1/foro/comments?id=${searchParams.get('id')}`)
                //console.log(res.data)
                setComments(res.data)
            } catch (error) {
                console.log(error)
                alert('error comments')
            }
        }
        getForo()
        getComments()
    }, [change])

    function print() {
        console.log(comments)
    }

    async function OnSubmit(e) {
        e.preventDefault()
        if (comment) {
            try {
                let newComment = {
                    _id: foro._id,
                    _user: usr._id,
                    comment: comment
                }
                let res = await axios.post('http://localhost:3001/clase1/foro/comments', newComment)
                alert('Comentario guardado!')
                setComment('')
                setChange(!change)
            } catch (error) {
                alert('Error al comentar!')
            }
        } else {
            alert('llene todos los campos')
        }
    }

    return(
        <div>
            <div className="row mt-5 justify-content-center align-middle">
                <div className="col-8 p-5">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">{foro.name}</h1>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control border-dark-subtle" placeholder="Type your comment" onChange={e => setComment(e.target.value)} value={comment}/>
                                    <button onClick={OnSubmit} className="btn btn-success">Comentar</button>
                                </div>
                            </form>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <h2>Comentarios</h2>
                                </div>
                                <div className="col-12">
                                    <ul className="list-group">
                                        {
                                            comments.map(x =>
                                                <li key={x._id} className="list-group-item d-flex justify-content-between">
                                                    <p className="text-left">
                                                        {x.fecha.split('T')[0]} {x.name}: {x.comment}
                                                    </p>
                                                    { x._user === usr._id ?
                                                        <div className="btn-group text-right" role="group">
                                                            <button onClick={print} className="btn btn-light btn-sm">
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button onClick={print} className="btn btn-light btn-sm">
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </div>
                                                        : null
                                                    }
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-3">
                                <button onClick={print} className="btn btn-primary">print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}