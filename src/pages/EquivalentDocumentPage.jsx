import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Loader from '../components/Loader'
import Message from "../components/Message"
import { formatDate, formatPrice } from "../tools/formatters"
import { base64toBlob } from "../tools/base64Utilities"
import { getEquivalentDocumentList, getEquivalentDocumentPDF } from "../actions/supplierActions"

const EquivalentDocumentPage = ({ supplierData }) => {

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

    const getEquivalentDocument = (e, exercise, documentNumber, position) => {
        e.preventDefault()

        setPageLoading(true)
        
        getEquivalentDocumentPDF(exercise, documentNumber, position)
            .then(res => {
                
                const blob = base64toBlob(res, 'application/pdf');
                const blobUrl = URL.createObjectURL(blob);
                
                setPageLoading(false)

                window.open(blobUrl);

            }).catch(error => {
                setError(error)
                setPageLoading(false)
            })
    }


    const submitHandler = e => {
        e.preventDefault()

        setError('')

        if( !e.target.startDate.value || !e.target.endDate.value) {
            setError('Es necesario indicar la fecha inicio y fin de consulta')
        } else {
            setPageLoading(true)
            getEquivalentDocumentList(supplierData.SUPPLIER_ID, e.target.startDate.value.replaceAll('-', ''), e.target.endDate.value.replaceAll('-', ''))
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

    return (
        <div className="equivalent-document-page">
            {pageLoading ? <Loader /> :
            <>
                <Row>
                    <Col>
                        <h2>Documento equivalente</h2>
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
                                            <th>Prefijo</th>
                                            <th>Número de documento</th>
                                            <th>Ejercicio</th>
                                            <th>Fecha de creación</th>
                                            <th># Doc. DIAN</th>
                                            <th>Valor</th>
                                            <th>Moneda</th>
                                            <th>Tipo de documento</th>
                                            <th>Referencia</th>
                                            <th>Factura</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(d => (
                                            <tr key={d.DOCUMENT_NUMBER}>
                                                <td>{d.PREFIX}</td>
                                                <td>{d.DOCUMENT_NUMBER}</td>
                                                <td>{d.EXCERCISE}</td>
                                                <td>{formatDate(d.CREATED_AT, '.')}</td>
                                                <td>{d.DIAN_DOC_NUMBER}</td>
                                                <td>{formatPrice(d.AMOUNT, true)}</td>
                                                <td>{d.CURRENCY}</td>
                                                <td>{d.DOCUMENT_TYPE}</td>
                                                <td>{d.REFERENCE}</td>
                                                <td>
                                                    <a href={`/equivalent-number/${d.INVOICE}`} onClick={e => getEquivalentDocument(e, d.EXCERCISE, d.INVOICE, d.POSITION_NUMBER)}>{d.INVOICE}</a>
                                                </td>
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

export default EquivalentDocumentPage