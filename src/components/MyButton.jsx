import Button from "react-bootstrap/Button"

import './styles/MyButton.scss'

const MyButton = ({ children, variant, type, onClick }) => {
    return (
        <Button className="my-btn" variant={ variant } type={ type } onClick={ onClick }>{ children }</Button>
    )
}

MyButton.defaultProps = {
    variant: 'primary',
    type: 'button'
}

export default MyButton