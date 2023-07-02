import React, { useState, useEffect } from "react";
import axios from 'axios'

export default function Photos(props) {

    const [photos, setPhotos] = useState([])
    const [change, setChange] = useState(false)

    //get photos
    useEffect(() => {
        async function getPhotos() {
            try {
                let res = await axios.get(`http://localhost:3001/clase1/photos`)
                console.log(res.data)
                setPhotos(res.data)
            } catch (error) {
                alert('error')
            }
        }

        getPhotos()
    }, [change])

    return (
        <div className="container-fluid">
            <div className="row mt-5 justify-content-center align-middle">
                <div className="col-8 p-5">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">My photos!</h1>
                        </div>
                        <div className="card-body">
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    {
                                        photos.map(x =>
                                            <div className="carousel-item active" key={x._id}>
                                                <img src={`http://localhost:3001/clase1/photos/one?fileName=${x.name}`}
                                                    className="d-block mx-auto" alt="..." style={{ height: '40vw' }} />
                                            </div>
                                        )
                                    }
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}