import React, { Component } from "react";
import axios from 'axios'

export default class View extends Component {
    state = {
        categorias: [],
    }

    async componentDidMount() {
        let res = await axios.get('http://localhost:3001/clase1/categoria')
        this.setState({categorias: res.data})
    }

    componentDidUpdate() {
        console.log("categorias state")
        console.log(this.state.categorias)
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5 justify-content-center align-middle mb-5">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center mt-2">Tipo: {this.props.tipo}</h3>
                            </div>
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
                                            this.state.categorias.map(categoria =>
                                                <tr key={categoria._id}>
                                                    <td>
                                                        {categoria.name}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <button type="button" className="btn btn-warning btn-sm m-1">
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <button type="button" className="btn btn-warning btn-sm m-1">
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
        )
    }
}