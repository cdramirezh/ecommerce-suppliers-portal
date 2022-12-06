import { useRef, useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import FormCenterContainer from "../components/FormCenterContainer"
import MyButton from "../components/MyButton"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Swal from 'sweetalert2'
import { forgotPasswordRestorePassword } from "../actions/userActions"

import './styles/ForgotPasswordPage.scss'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const $form = useRef(null)

    useEffect(() => {
        if(!code || code?.length < 15) {
            navigate('/login')
        }
    }, [navigate, code])

    const handleSubmit = e => {
        e.preventDefault()

        setMessage('')

        $form.current.password.classList.remove('is-invalid')
        $form.current.confirmPassword.classList.remove('is-invalid')

        if($form.current.password.value === '' || $form.current.password.value.length < 6) {
            return $form.current.password.classList.add('is-invalid')
        } else if($form.current.confirmPassword.value !== $form.current.password.value) {
            return $form.current.confirmPassword.classList.add('is-invalid')
        } else {
            setLoading(true)

            forgotPasswordRestorePassword(code, $form.current.password.value)
                .then(() => {
                    Swal.fire('Contraseña actualizada correctamente', 'Puede iniciar sesión con la nueva contraseña', 'success')
                    navigate('/login')
                }).catch(error => {
                    setMessage(error)
                    setLoading(false)
                })
        }
    }

    return (
        <Row className="forgot-password-page">
            <Col>
                {loading ? <Loader /> :
                <FormCenterContainer>
                    <h1 className="text-center mb-5">Restablecer contraseña</h1>
                    {message && <Message variant="danger">{message}</Message>}
                    <Form onSubmit={e => handleSubmit(e)} ref={$form}>
                        <Form.Group>
                            <FloatingLabel label="Nueva contraseña">
                                <Form.Control type="password" name="password" placeholder="Ingresar nueva contraseña" onChange={e => setPassword(e.target.value)} value={password} autoFocus />
                                <div className="invalid-feedback">
                                    Indique nueva contraseña de mínimo 6 caracteres
                                </div>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group>
                            <FloatingLabel label="Confirmar nueva contraseña">
                                <Form.Control type="password" name="confirmPassword" placeholder="Confirmar nueva contraseña" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
                                <div className="invalid-feedback">
                                    Las contraseñas no coinciden
                                </div>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="d-grid mt-3">
                            <MyButton type="submit">Cambiar contraseña</MyButton>
                        </Form.Group>
                    </Form>
                </FormCenterContainer>
                }
            </Col>
        </Row>
    )
}

export default ForgotPassword