import { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Loader from '../components/Loader'
import { useNavigate } from "react-router-dom"
import { getPendingInvoices } from "../actions/supplierActions"

import './styles/PendingInvoicesPage.scss'
import Message from "../components/Message"
import { formatDate, formatPrice } from "../tools/formatters"

const PendingInvoicesPage = ({ supplierData }) => {

    const navigate = useNavigate()
    const [pageLoading, setPageLoading] = useState(true)
    const [data, setData] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if(!supplierData) {
            navigate('/login')
        } else {
            getPendingInvoices(supplierData.SUPPLIER_ID)
                .then(res => {
                    setData(res)
                    setError('')
                    setPageLoading(false)
                }).catch(error => {
                    setError(error)
                    setPageLoading(false)
                })
        }
    }, [navigate, supplierData])


    return (
        <div className="pending-invoices-page">
            {pageLoading ? <Loader /> :
            error ? <Message variant='danger'>{error}</Message> :
            <>
                <Row>
                    <Col>
                        <h2>Estado de cuenta</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {data.length ? (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Número de referencia</th>
                                        <th>Clase de documento</th>
                                        <th>Número de documento</th>
                                        <th>Documento compensación</th>
                                        <th>Fecha de registro contable</th>
                                        <th>Fecha de documento</th>
                                        <th>Fecha de vencimiento neto</th>
                                        <th>Valor del importe</th>
                                        <th>Texto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(d => (
                                        <tr key={d.REFERENCE_NUMBER}>
                                            <td>{d.REFERENCE_NUMBER}</td>
                                            <td>{d.DOCUMENT_TYPE}</td>
                                            <td>{d.DOCUMENT_NUMBER}</td>
                                            <td>{d.COMPENSATION_DOCUMENT}</td>
                                            <td>{formatDate(d.ACCOUNTING_RECORD_DATE, '.')}</td>
                                            <td>{formatDate(d.DOCUMENT_DATE, '.')}</td>
                                            <td>{formatDate(d.NET_EXPIRATION_DATE, '.')}</td>
                                            <td>{formatPrice(d.AMOUNT, true)}</td>
                                            <td>{d.TEXT}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={7}>
                                            <b>Total</b>
                                        </td>
                                        <td>
                                            <b>{ formatPrice(data.reduce( (acum, data) => acum += data.AMOUNT, 0 ).toFixed(2), true)}</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        ) : <Message>No hay datos para mostrar</Message>}
                    </Col>
                </Row>
            </>}
        </div>
    )
}

export default PendingInvoicesPage