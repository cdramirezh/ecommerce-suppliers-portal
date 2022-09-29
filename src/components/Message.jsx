import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"

const Message = ({ variant, children }) => (
    <Row>
        <Col>
            <Alert variant={variant}>
                {children}
            </Alert>
        </Col>
    </Row>
)

Message.defaultProps = {
    variant: 'info'
}

export default Message