import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

import './styles/ProfilePage.scss'

const ProfilePage = () => {
    const data = JSON.parse(sessionStorage.getItem('supplierData'))
    return (
        <Container className="profile-page">
            <Row>
                <Col>
                    <h2>Mis datos</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <FloatingLabel label="Tipo de identificación">
                                    <Form.Select name="idType" defaultValue={data.DOC_TYPE} disabled>
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
                            <Col xs={6}>
                                <FloatingLabel label="Número de identificación">
                                    <Form.Control name="idNumber" defaultValue={data.DOC_NUMBER} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Razón Social">
                            <Form.Control name="businessName" defaultValue={data.BUSINESS_NAME} disabled />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Correo electrónico">
                            <Form.Control name="email" defaultValue={data.EMAIL} disabled />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <FloatingLabel label="Celular">
                                    <Form.Control name="mobile" defaultValue={data.MOBILE} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col xs={6}>
                                <FloatingLabel label="Teléfono">
                                    <Form.Control name="telephone" defaultValue={data.TELEPHONE} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <FloatingLabel label="País">
                                    <Form.Control name="country" defaultValue={data.COUNTRY_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col xs={6}>
                                <FloatingLabel label="Departamento">
                                    <Form.Control name="region" defaultValue={data.REGION_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <FloatingLabel label="Ciudad">
                                    <Form.Control name="city" defaultValue={data.CITY_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col xs={6}>
                                <FloatingLabel label="Código postal">
                                    <Form.Control name="postalCode" defaultValue={data.POSTAL_CODE} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Dirección">
                            <Form.Control name="address" defaultValue={data.ADDRESS} disabled />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col xs={6}>
                                <FloatingLabel label="Clase de impuesto">
                                    <Form.Control name="taxClass" defaultValue={data.TAX_CLASS_DESC} disabled />
                                </FloatingLabel>
                            </Col>
                            <Col xs={6}>
                                <FloatingLabel label="Número de cuenta bancaria">
                                    <Form.Control name="bankAccount" defaultValue={data.BANK_ACCOUNT} disabled />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Condición de pago">
                            <Form.Control name="paymentCondition" defaultValue={data.PAYMENT_CONDITION_DESC} disabled />
                        </FloatingLabel>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage