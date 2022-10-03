import axios from "axios"
import DateManager from '../tools/DateManager'
import { getSupplierData } from "./supplierActions"

export const checkUserExist = user => new Promise((resolve, reject) =>
    axios.get(`${process.env.REACT_APP_URL_API_MOVILIDAD}/searchUser/${user}`)
        .then(res => res.data.length ? resolve(true) : resolve(false))
        .catch(error => reject(error))
)

export const registerUser = (documentType, documentNumber, password, supplierId, supplierName) => new Promise((resolve, reject) => {
    const user = `ESP${documentType}${documentNumber}` // ESP - Ecommerce Suppliers Portal
    const systemUser = process.env.REACT_APP_USER
    const dateManager = new DateManager()

    checkUserExist(user)
        .then(res => {
            if(res) {
                return reject('Usuario ya existe.')
            } else {
                axios.post(`${process.env.REACT_APP_URL_API_MOVILIDAD}/ws_rest/Ecommerce/structure/ACCOUNT_IN`, {
                    data: JSON.stringify({
                        ARRAY: {
                            ID: "",
                            USER: systemUser,
                            ORIGIN: "I",
                            ACCOUNT: supplierId,
                            DATA: [{
                                    USUFRUCTUARIO: {
                                        USER_NAME: user,
                                        ACCOUNT: "",
                                        FIRST_NAME: supplierName.length > 30 ? supplierName.substring(0, 30) : supplierName,
                                        LAST_NAME: "",
                                        USER_TYPE: "E",
                                        PCODE: user,
                                        LOCKED: 0,
                                        CREATION_USER: systemUser,
                                        CREATION_DATE: dateManager.getStringSAPDateFormat(),
                                        CREATION_TIME: dateManager.getStringSAPTimeFormat(),
                                        VALID_FROM: dateManager.getStringSAPDateFormat(),
                                        VALID_TO: "99991230",
                                        TASK: "I"
                                    },
                                    LEMA: {
                                        PCODE: user,
                                        BASE64: btoa(password)
                                    }
                            }]
                        }
                    })
                }).then(res => {
                    return resolve()
                }).catch(error => {
                    console.error('RegisterUser', error)
                    return reject('Ha ocurrido un error inesperado, por favor vuelva a intentarlo.')
                })
            }
        }).catch(error => {
            console.error('RegisterUser', error)
            return reject('Ha ocurrido un error inesperado, por favor vuelva a intentarlo.')
        })
})

export const login = (documentType, documentNumber, password) => new Promise((resolve, reject) => {

    const username = `ESP${documentType}${documentNumber}`

    axios.post(`${process.env.REACT_APP_URL_API_MOVILIDAD}/login`, {
        userName: username,
        password
    },
    {
        headers: {
            json_output: true
        }
    }).then(() => {
        getSupplierData(documentType, documentNumber, true)
            .then(() => {
                resolve()
            })
    }).catch(error => {
        if(error.response.data.error === 'Oops! Contraseña errónea.') {
            reject('Número de documento y/o contraseña erronea')
        }else if(error.response.data.error === 'El usuario no es correcto.') {
            reject('Número de documento y/o contraseña erronea')
        } else {
            console.error('login', error)
            reject('Ha ocurrido un error inesperado, por favor vuelva a intentarlo.')
        }
    })
})