import axios from "axios"

const requestToSAP = (endpoint, body) => axios.post(`${process.env.REACT_APP_URL_API_MOVILIDAD}/send_external_system?url=` + encodeURIComponent(endpoint), body, {
    auth: {
        username: process.env.REACT_APP_USER,
        password: process.env.REACT_APP_PASS
    }
})

export default requestToSAP