import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Loader from "../components/Loader"
import FormCenterContainer from "../components/FormCenterContainer"
import Message from "../components/Message"
import MyButton from "../components/MyButton"
import { forgotPasswordSendEmail, login } from "../actions/userActions"
import Swal from 'sweetalert2'
import SEO from "../components/SEO"

import './styles/LoginPage.scss'

const LoginPage = ({ supplierData, setSupplierData }) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const [idType, setIdType] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [password, setPassword] = useState('')

    const $form = useRef(null)

    useEffect(() => {
        if(supplierData) {
            navigate('/profile')
        }
    })

    const isOk = () => {
        let ok = true

        $form.current.idType.classList.remove('is-invalid')
        $form.current.idNumber.classList.remove('is-invalid')
        $form.current.password.classList.remove('is-invalid')

        // Tipo de identificación
        if($form.current.idType.value === '') {
            ok = false
            $form.current.idType.classList.add('is-invalid')
        }

        // Número de identificación
        if($form.current.idNumber.value === '') {
            ok = false
            $form.current.idNumber.classList.add('is-invalid')
        }

        // Contraseña
        if($form.current.password.value === '') {
            ok = false
            $form.current.password.classList.add('is-invalid')
        }

        return ok
    }

    const handleSubmit = e => {
        e.preventDefault()

        setMessage('')
        setLoading(true)

        if(isOk()) {
            login(idType, idNumber, password)
                .then(res => {
                    setSupplierData(res)
                    navigate('/profile')
                }).catch(error => {
                    setLoading(false)
                    setMessage(error)
                })
        } else {
            setLoading(false)
        }

    }

    const handleForgotPassword = e => {
        e.preventDefault()

        setMessage('')

        if(idType === '' || idNumber === '') {
            return setMessage('Es necesario diligenciar el tipo y número de identificación')
        }

        setLoading(true)

        forgotPasswordSendEmail(idType, idNumber)
            .then(() => {
                setLoading(false)
                setTimeout(() => Swal.fire('Mensaje enviado', 'Se ha enviado un mensaje a su correo electrónico registrado para restablecer la contraseña', 'success'), 1000)
            })
            .catch(error => {
                setLoading(false)
                return setMessage(error.message)
            })
    }

    return (
        <Row className="login-page">
            <SEO title="Decorceramica - Portal de colaboradores | Iniciar sesión" description="Inicia sesión y autogestiona tus necesidades" />
            <Col>
                {loading ? <Loader /> :
                <FormCenterContainer>
                    <h1 className="text-center mb-5">Iniciar sesión</h1>
                    {message && <Message variant="danger">{message}</Message>}
                    <Form onSubmit={e => handleSubmit(e)} ref={$form}>
                        <Form.Group>
                            <FloatingLabel label="Tipo de identificación">
                                <Form.Select name="idType" onChange={e => setIdType(e.target.value)} value={idType} autoFocus>
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
                        </Form.Group>
                        <Form.Group>
                            <FloatingLabel label="Número de identificación">
                                <Form.Control type="number" name="idNumber" placeholder="Ingresar número de identificación" onChange={e => setIdNumber(e.target.value)} value={idNumber} />
                                <div className="invalid-feedback">
                                    Número de identificación inválido
                                </div>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group>
                            <FloatingLabel label="Contraseña">
                                <Form.Control type="password" name="password" placeholder="Ingresar contraseña" onChange={e => setPassword(e.target.value)} value={password} />
                                <div className="invalid-feedback">
                                    Indique contraseña
                                </div>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="d-grid mt-3">
                            <MyButton type="submit">Iniciar sesión</MyButton>
                        </Form.Group>
                    </Form>
                    <Row className="my-3">
                        <Col>
                            <span>¿Aún no tiene una cuenta? <Link to='/register'>Registrarse</Link></span>
                            <span><a href="/forgotPassword" onClick={e => handleForgotPassword(e)}>¿Ha olvidado su contraseña?</a></span>
                        </Col>
                    </Row>
                </FormCenterContainer>
                }
            </Col>
        </Row>
    )
}

export default LoginPage