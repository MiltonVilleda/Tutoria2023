import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Home(props) {

    const [usr, setUsr] = useState('')
    const [change, setChange] = useState(false)
    const navigate = useNavigate()

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

    function print() {
        console.log(usr)
    }

    return(
        <div className="container">
            <div className="row mt-5 justify-content-center align-middle">
                <div className="col-6 p-5">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Welcome {usr.name}!</h1>
                            <button type="button" className="btn btn-primary btn-sm" onClick={print}>print</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}