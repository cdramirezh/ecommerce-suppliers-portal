import axios from "axios"

const requestToSAP = (endpoint, body) => axios.post(`${process.env.REACT_APP_URL_API_MOVILIDAD}/send_external_system?url=` + encodeURIComponent(endpoint), body, {
    auth: {
        username: "MOVILIDAD",
        password: "M0v1l1d4d"
    }
})

export default requestToSAP