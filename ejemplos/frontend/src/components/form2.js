import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Form2(props) {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [change, setChange] = useState(false)

    useEffect(() => {
        async function load() {
            let res = await axios.get('http://localhost:3001/clase1/producto')
            setProducts(res.data)
        }
        load()
    }, [change])

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center align-middle mb-5">
                {
                    products.map(product =>
                        <div className="col-4 p-2" key={product._id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <p className="text-center">{product.name}</p>
                                    <p className="text-center">Q. {product.precio}</p>
                                    <p className="text-center">Marca: {product.marca}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="d-grid gap-2">
                                        <button type="button" className="btn btn-primary btn-sm m-1">Agregar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}