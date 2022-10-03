import requestToSAP from "../tools/requestToSap"

export const getSupplierData = (documentType, documentNumber, saveData) => new Promise((resolve, reject) => {
    requestToSAP(`${process.env.REACT_APP_URL_API_ERP}/clovit/ws_rest?sap-client=300&method=GET_SUPPLIER_DATA&object=Account`, {
        ID: documentNumber,
        USER: process.env.REACT_APP_USER,
        ORIGIN: "I",
        DATA: {
            DOC_TYPE: documentType,
            DOC_NUMBER: documentNumber
        }
    }).then(res => {
        if(res.data.ARRAY.BUSINESS_NAME) {
            if(saveData) {
                sessionStorage.setItem('supplierData', JSON.stringify(res.data.ARRAY))
            }
            return resolve(res.data.ARRAY)
        } else {
            return resolve(null)
        }
    }).catch(error => {
        console.error('getSupplierData:', error)
        return reject('Ha ocurrido un error inesperado, por favor vuelva a intentarlo.')
    })
})