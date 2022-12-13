import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getCertificatePDF } from "../actions/supplierActions"
import { base64toBlob } from "../tools/base64Utilities"
import SEO from "../components/SEO"

import './styles/CertificatesPage.scss'

const CertificatesPage = ({ supplierData }) => {

    const navigate = useNavigate
    const [pageLoading, setPageLoading] = useState(false)
    const [result, setResult] = useState('')

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [certificateType, setCertificateType] = useState('')

    useEffect(() => {
        if(!supplierData) {
            navigate('/login')
        }
    }, [navigate, supplierData])

    const submitHandler = e => {
        e.preventDefault()

        setResult('')

        if( !e.target.startDate.value || !e.target.endDate.value) {
            setResult({
                error: true,
                message: 'Es necesario indicar la fecha inicio y fin de consulta'
            })
        } else if(e.target.startDate.value.substring(0,4) !== e.target.endDate.value.substring(0,4)) {
            setResult({
                error: true,
                message: 'El rango de fechas debe ser del mismo año'
            })
        }else if(!e.target.certificateType.value) {
            setResult({
                error: true,
                message: 'Es necesario indicar el tipo de certificado'
            })
        } else {
            setPageLoading(true)

            getCertificatePDF(supplierData.SUPPLIER_ID, e.target.startDate.value.replaceAll('-', ''), e.target.endDate.value.replaceAll('-', ''), e.target.certificateType.value )
                .then(res => {
                    const blob = base64toBlob(res, 'application/pdf')
                    const blobUrl = URL.createObjectURL(blob);
                    setPageLoading(false)
                    window.open(blobUrl);
                }).catch(error => {
                    setResult(error)
                    setPageLoading(false)
                })
        }
    }

    return (
        <div className="certificates-page">
            <SEO title="Decorceramica - Portal de colaboradores | Certificados" description="Obten tus certfificados de una forma fácil y rápida." />
            {pageLoading ? <Loader /> :
            <>
                <Row>
                    <Col>
                        <h2>Certificados</h2>
                    </Col>
                </Row>
                {result && (
                    <Row>
                        <Col>
                            <Message variant={result.error ? 'danger' : 'info'}>{result.message}</Message> 
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
                                <Col>
                                    <p>Seleccione el tipo de certificado:</p>
                                    <Form.Check type="radio" label="Retención en la fuente renta" value="FTE" id="FTE" name="certificateType" onChange={e => setCertificateType(e.target.value)} checked={certificateType === 'FTE'} />
                                    <Form.Check type="radio" label="Retención de industria y comercio" value="ICA" id="ICA" name="certificateType" onChange={e => setCertificateType(e.target.value)} checked={certificateType === 'ICA'} />
                                    <Form.Check type="radio" label="Retención de IVA" value="IVA" id="IVA" name="certificateType" onChange={e => setCertificateType(e.target.value)} checked={certificateType === 'IVA'} />
                                </Col>
                            </Row>
                            <Row className="my-3">
                                <Col className="text-center">
                                    <Button type="submit">Buscar</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row className="message">
                    <Col>
                        <Card>
                            <Card.Body>
                                <p>En caso de tener diferencias o no poder obtener el certificado, por favor comunicarse con el área de impuestos por medio del correo electrónico <a href="mailto:impuestos@grupodecor.com">impuestos@grupodecor.com</a>.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>}
        </div>
    )
}

export default CertificatesPage