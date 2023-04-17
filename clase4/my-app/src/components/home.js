import React, { Component } from "react";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-5 justify-content-center align-middle">
                    <div className="col-4 p-5">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="text-center">Ejemplo React</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}