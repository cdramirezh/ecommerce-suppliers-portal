import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Loader from '../components/Loader'
import Message from "../components/Message"
import { getPaymentList, getPaymentPDF } from "../actions/supplierActions"
import { formatDate, formatPrice } from "../tools/formatters"

import './styles/PaymentsPage.scss'

const PaymentsPage = ({ supplierData }) => {

    const navigate = useNavigate()
    const [pageLoading, setPageLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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
        }
    }

    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    const getInvoice = (e, paymentIndicator, paymentDate) => {

        e.preventDefault()
        setPageLoading(true)
        
        getPaymentPDF(supplierData.SUPPLIER_ID, paymentIndicator, paymentDate)
            .then(res => {
                
                const blob = b64toBlob(res, 'application/pdf');
                const blobUrl = URL.createObjectURL(blob);
                
                setPageLoading(false)

                window.open(blobUrl);

            }).catch(error => console.log(error))
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
                            <Row>
                                <Col>
                                    <Form.Label><b>Fecha Inicio</b></Form.Label>
                                    <Form.Control type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} autoFocus />
                                </Col>
                                <Col>
                                    <Form.Label><b>Fecha Fin</b></Form.Label>
                                    <Form.Control type="date" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />
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
                                                    <a href={`/invoice/${d.INVOICE_ID}`} onClick={e => getInvoice(e, d.PAYMENT_INDICATOR, d.PAYMENT_DATE)}>
                                                        {d.INVOICE_ID}
                                                    </a>
                                                </td>
                                                <td>{d.PAYMENT_INDICATOR}</td>
                                                <td>{d.PAYMENT_DOCUMENT}</td>
                                                <td>{formatDate(d.PAYMENT_DATE, '.')}</td>
                                                <td>{formatPrice(d.AMOUNT, true)}</td>
                                                <td>{d.CURRENCY}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={4}>
                                                <b>Total</b>
                                            </td>
                                            <td>
                                                <b>{formatPrice(data.reduce( (acum, data) => acum += data.AMOUNT, 0 ).toFixed(2), true)}</b>
                                            </td>
                                            <td></td>
                                        </tr>
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