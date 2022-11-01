import { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Loader from '../components/Loader'
import { useNavigate } from "react-router-dom"
import { getPendingInvoices } from "../actions/supplierActions"

import './styles/PendingInvoicesPage.scss'
import Message from "../components/Message"

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
    })


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
                                        <td>{d.ACCOUNTING_RECORD_DATE}</td>
                                        <td>{d.DOCUMENT_DATE}</td>
                                        <td>{d.NET_EXPIRATION_DATE}</td>
                                        <td>{d.AMOUNT}</td>
                                        <td>{d.TEXT}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>}
        </div>
    )
}

export default PendingInvoicesPage