import React, { useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter, Bubble } from 'react-chartjs-2'
//import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js/auto";
import datasets from "../datasets/lineal_data";

export default function Graphs(props) {
    const [barra, setData] = useState(datasets.lineal1)
    const [linal, setLineal] = useState(datasets.lineal2)
    const [pie, setPie] = useState(datasets.lineal3)
    const [polar, setPolar] = useState(datasets.lineal4)
    const [radar, setRadar] = useState(datasets.lineal5)
    const [scale_zero, setScaleZero] = useState(
        {
            responsive: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0
                }
            }
        }
    )
    const [data2, setData2] = useState(
        {
            datasets: [{
                label: 'Puntos',
                data: [
                    {
                        x: 10,
                        y: 10,
                        r: 10
                    },
                    {
                        x: 20,
                        y: 20,
                        r: 20
                    },
                    {
                        x: 30,
                        y: 30,
                        r: 10
                    },
                    {
                        x: 40,
                        y: 40,
                        r: 20
                    }
                ],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.4)',
                    'rgba(0, 255, 0, 0.4)',/*
                    'rgba(0, 0, 255, 0.4)',*/
                ],
                borderColor: [
                    'rgba(255, 100, 100)',
                    'rgba(100, 255, 100)',/*
                    'rgba(100, 100, 255)',*/
                ],
                borderWidth: 3
            }]
        }
    )
    
    return (
        <div className="container">
            <div className="row mt-5 mb-5">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-center">Graficas</h1>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-4 text-center">
                                <h3>Gráfica de barras</h3>
                                <Bar data={barra} />
                            </div>
                            <div className="col-4 text-center">
                                <h3>Gráfica lineal</h3>
                                <Line data={linal} />
                            </div>
                            <div className="col-4 text-center">
                                <h3>Gráfica de pie</h3>
                                <Pie data={pie} />
                            </div>
                            <div className="col-4 text-center">
                                <h3>Gráfica de dona</h3>
                                <Doughnut data={pie} />
                            </div>
                            <div className="col-4 text-center">
                                <h3>Gráfica polar</h3>
                                <PolarArea data={polar} />
                            </div>
                            <div className="col-4 text-center">
                                <h3>Gráfica de radar</h3>
                                <Radar data={radar} options={scale_zero}/>
                            </div>
                            <div className="col-4 text-center">
                                <h3>Gráfica scatter</h3>
                                <Scatter data={data2} />
                            </div>
                            <div className="col-4 text-center">
                                <h3>Gráfica de burbujas</h3>
                                <Bubble data={data2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}