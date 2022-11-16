import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Loader from '../components/Loader'
import Message from "../components/Message"
import { getPaymentList } from "../actions/supplierActions"

const PaymentsPage = ({ supplierData }) => {

    const navigate = useNavigate()
    const [pageLoading, setPageLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if(!supplierData) {
            navigate('/login')
        }
    }, [navigate, supplierData])

    const submitHandler = e => {
        e.preventDefault()

        setError('')

        if( !e.target.startDate.value || !e.target.endDate.value) {
            setError('Es necesario indicar la fecha inicio y fin de consulta')            
        } else {
            setPageLoading(true)
            getPaymentList(supplierData.SUPPLIER_ID, e.target.startDate.value.replaceAll('-', ''), e.target.endDate.value.replaceAll('-', ''))
                .then(res => {
                    setData(res)
                    setError('')
                    setPageLoading(false)
                }).catch(error => {
                    setError(error)
                    setPageLoading(false)
                })
            console.log('submited', e.target.startDate.value)
        }
    }

    const getInvoice = e => {
        e.preventDefault()

        console.log('Success')
    }

    return (
        <div className="payments-page">
            {pageLoading ? <Loader /> :
            <>
                <Row>
                    <Col>
                        <h2>Pagos</h2>
                    </Col>
                </Row>
                {error && (
                    <Row>
                        <Col>
                            <Message variant='danger'>{error}</Message> 
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col>
                        <p>Seleccione el rango de fechas:</p>
                        <Form onSubmit={submitHandler}>
                            <Row className>
                                <Col>
                                    <Form.Label><b>Fecha Inicio</b></Form.Label>
                                    <Form.Control type="date" name="startDate" autoFocus />
                                </Col>
                                <Col>
                                    <Form.Label><b>Fecha Fin</b></Form.Label>
                                    <Form.Control type="date" name="endDate" />
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col className="text-end">
                                    <Button type="submit">Buscar</Button>
                                </Col>
                            </Row>
                        </Form>
                        {data.length ? (
                            <Row>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Número de factura</th>
                                            <th>Indicador del pago</th>
                                            <th>Docuemnto de pago</th>
                                            <th>Fecha del pago</th>
                                            <th>Valor</th>
                                            <th>Moneda</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(d => (
                                            <tr key={d.INVOICE_ID}>
                                                <td>
                                                    <a href={`/invoice/${d.INVOICE_ID}`} onClick={e => getInvoice(e)}>
                                                        {d.INVOICE_ID}
                                                    </a>
                                                </td>
                                                <td>{d.PAYMENT_INDICATOR}</td>
                                                <td>{d.PAYMENT_DOCUMENT}</td>
                                                <td>{d.PAYMENT_DATE}</td>
                                                <td>{d.AMOUNT}</td>
                                                <td>{d.CURRENCY}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Row>
                        ) : <Message>No hay datos para mostrar</Message>}
                    </Col>
                </Row>
            </>}
        </div>
    )
}

export default PaymentsPage