import { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import Loader from '../components/Loader'
import Message from "../components/Message"
import { useNavigate } from "react-router-dom"
import { getPendingInvoices } from "../actions/supplierActions"
import { formatDate, formatPrice } from "../tools/formatters"
import SEO from "../components/SEO"

import './styles/PendingInvoicesPage.scss'

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
            <SEO title="Decorceramica - Portal de colaboradores | Estado de cuenta" description="Comprueba el estado de cuenta actual que tienes con la compañía" />
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
            <Row className="message">
                <Col>
                    <Card>
                        <Card.Body>
                            <p>En caso de una inconsistencia o de requerir algún dato adicional en esta información, por favor comunicarse con el área de contabilidad a través del correo electrónico <a href="mailto:contabilidad@grupodecor.com">contabilidad@grupodecor.com</a> indicando la inconsistencia en la información requerida.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PendingInvoicesPage