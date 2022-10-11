import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"
import Alert from "react-bootstrap/Alert"

import './styles/ProfilePage.scss'

const ProfilePage = ({ supplierData }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if(!supplierData) {
            navigate('/login')
        }
    })

    return (
        <Container className="profile-page">
            <Row>
                <Col>
                    <h2>Mis datos</h2>
                </Col>
            </Row>
            {supplierData &&
            <>
            <Row>
                <Col>
                    <Form.Group>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel label="Tipo de identificación">
                                    <Form.Select name="idType" defaultValue={supplierData.DOC_TYPE} disabled>
                                        <option value="">Seleccione un tipo de identificación</option>
                                        <option value="13">Cédula de ciudadanía</option>
                                        <option value="22">Cédula de extranjería</option>
                                        <option value="31">NIT</option>
                                        <option value="41">Pasaporte</option>
                                    </Form.Select>
                                    <div className="invalid-feedback">
                                        Indique tipo de identificación
                                    </div>
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel label="Número de identificación">
                                    <Form.Control name="idNumber" defaultValue={supplierData.DOC_NUMBER} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Razón Social">
                            <Form.Control name="businessName" defaultValue={supplierData.BUSINESS_NAME} disabled />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Correo electrónico">
                            <Form.Control name="email" defaultValue={supplierData.EMAIL} disabled />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel label="Celular">
                                    <Form.Control name="mobile" defaultValue={supplierData.MOBILE} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel label="Teléfono">
                                    <Form.Control name="telephone" defaultValue={supplierData.TELEPHONE} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel label="País">
                                    <Form.Control name="country" defaultValue={supplierData.COUNTRY_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel label="Departamento">
                                    <Form.Control name="region" defaultValue={supplierData.REGION_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel label="Ciudad">
                                    <Form.Control name="city" defaultValue={supplierData.CITY_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel label="Código postal">
                                    <Form.Control name="postalCode" defaultValue={supplierData.POSTAL_CODE} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Dirección">
                            <Form.Control name="address" defaultValue={supplierData.ADDRESS} disabled />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel label="Clase de impuesto">
                                    <Form.Control name="taxClass" defaultValue={supplierData.TAX_CLASS_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel label="Número de cuenta bancaria">
                                    <Form.Control name="bankAccount" defaultValue={supplierData.BANK_ACCOUNT} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Condición de pago">
                            <Form.Control name="paymentCondition" defaultValue={supplierData.PAYMENT_CONDITION_DESC} disabled />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Impuestos de contabilidad</h4>
                    {supplierData.ACCOUNTING_TAXES.length ?
                    <Table>
                        <thead>
                            <tr>
                                <th>Tipo de redención</th>
                                <th>Indicador de retención</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplierData.ACCOUNTING_TAXES.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        {row.RETENTION_TYPE_DESC}
                                    </td>
                                    <td>
                                        {row.RETENTION_INDICATOR_DESC}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> : <Alert>no hay información para mostrar</Alert>}
                </Col>
            </Row>
            </>}
        </Container>
    )
}

export default ProfilePage