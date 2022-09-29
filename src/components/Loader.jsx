import Spinner from "react-bootstrap/Spinner"

const Loader = ({ width, height, border }) => (
    <div className="loader">
        <Spinner animation='border' role='status' style={{ width: width, height: height, margin: 'auto', display: 'block', border: `${border} solid currentColor`, borderRightColor: 'transparent' }} />
    </div>
)

Loader.defaultProps = {
    width: '100px',
    height: '100px',
    border: '.25em'
}

export default Loader