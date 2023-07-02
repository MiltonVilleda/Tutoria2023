import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from 'axios'

export default function Bills(props) {

    const [bills, setBills] = useState([])
    const [change, setChange] = useState(false)
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    //get user info
    useEffect(() => {
        async function getToken() {
            try {
                let token = localStorage.getItem('token')
                let res = await axios.get(`http://localhost:3001/clase1/login/getToken?token=${token}`)
                let token_result = res.data.data
                let res3 = await axios.get(`http://localhost:3001/clase1/user/bills/${token_result.id}`)
                setBills(res3.data)
            } catch (error) {
                alert('error user')
            }
        }
        getToken()
    }, [change])

    function print() {
        console.log(bills)
    }

    function generatePdf(bill) {
        let body = [
            [{ text: 'Descripcion', style: 'tableHeader', colSpan: 4 }, {}, {}, {}],
            [
                { text: 'Cantidad', alignment: 'center' },
                { text: 'Producto', alignment: 'center' },
                { text: 'Precio', alignment: 'center' },
                { text: 'Subtotal', alignment: 'center' },
            ]
        ]
        for (let item of bill.productos) {
            body.push(
                [
                    { text: item.cantidad, alignment: 'center' },
                    `${item.name} - ${item.marca}`,
                    { text: item.precio, alignment: 'center' },
                    { text: item.sub_total, alignment: 'center' },
                ]
            )
        }
        body.push([{ text: 'Total', style: 'tableHeader', colSpan: 3 }, {}, {}, { text: bill.total, alignment: 'center' }])
        let dd = {
            content: [
                { text: 'Factura', style: 'header', alignment: 'center' },
                { text: `No Factura: ${bill._id}`, style: 'subheader2' },
                { text: `Fecha: ${bill.fecha.split('T')[0]}`, style: 'subheader2' },
                {
                    columns: [
                        {
                            style: 'tableExample',
                            table: {
                                body: body,
                                widths: ['*', 'auto', 100, '*']
                            }
                        }
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                subheader2: {
                    fontSize: 14,
                    bold: false,
                    margin: [0, 3, 0, 3]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    alignment: 'center',
                    margin: [70, 0, 70, 0]
                }
            }
        }
        //pdfMake.createPdf(dd).download()
        pdfMake.createPdf(dd).open()
    }

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Facturas</h1>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {
                                    bills.map(x =>
                                        <li key={x._id} className="list-group-item d-flex justify-content-between">
                                            <p className="text-left">
                                                {x.fecha.split('T')[0]} | Total: {x.total} | Productos: {x.productos.length}
                                            </p>
                                            <button onClick={() => generatePdf(x)} className="btn btn-primary btn-sm">
                                                <i className="bi bi-eye"> Ver factura</i>
                                            </button>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}