import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Home(props) {

    const [usr, setUsr] = useState('')
    const [foros, setForos] = useState([])
    const [change, setChange] = useState(false)
    const navigate = useNavigate()

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
                alert('error')
            }
        }

        getToken()
    }, [change])

    //get all foros
    useEffect(() =>{
        async function getForos() {
            try {
                let res = await axios.get('http://localhost:3001/clase1/foro')
                console.log(res.data)
                setForos(res.data)
            } catch (error) {
                alert(error)
            }
        }

        getForos()
    }, [change])

    function print() {
        //console.log(usr)
        console.log(foros)
    }

    function viewForo(id){
        navigate(`/foro?id=${id}`)
    }

    return(
        <div className="container">
            <div className="row mt-5 justify-content-center align-middle">
                <div className="col-8 p-5">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Welcome {usr.name}!</h1>
                            <button onClick={print} className="btn btn-primary">print</button>
                        </div>
                        <div className="card-body">
                            <h2>Foros</h2>
                            <table className="table">
                                <tbody>
                                    {
                                        foros.map(foro =>
                                            <tr key={foro._id} onClick={() => viewForo(foro._id)}>
                                                <td>{foro.name}</td>
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
    )
}