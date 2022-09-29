import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import './styles/FormCenterContainer.scss'

const FormCenterContainer = ({children}) => (
    <Container className="form-center-container">
        <Row>
            <Col xs={12} md={10} lg={6}>
                {children}
            </Col>
        </Row>
    </Container>
)

export default FormCenterContainer