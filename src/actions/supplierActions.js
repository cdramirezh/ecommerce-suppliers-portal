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

export const getPendingInvoices = supplierId => new Promise((resolve, reject) => {
    requestToSAP(`${process.env.REACT_APP_URL_API_ERP}/clovit/ws_rest?sap-client=300&method=GET_SUPPLIER_PENDING_INVOICES&object=Account`, {
        ID: supplierId,
        USER: process.env.REACT_APP_USER,
        ORIGIN: "I",
        SUPPLIER_ID: supplierId
    }).then(res =>
        resolve(res.data.ARRAY)
    ).catch(error => {
        console.error('getPendingInvoices', error)
        return reject('Ha ocurrido un error inesperado, por favor vuelva a intentarlo.')
    })
})

export const getPaymentList = (supplierId, startDate, endDate) => new Promise((resolve, reject) => {
    requestToSAP(`${process.env.REACT_APP_URL_API_ERP}/clovit/ws_rest?sap-client=300&method=GET_SUPPLIER_PAYMENT_LIST&object=Account`, {
        ID: supplierId,
        USER: process.env.REACT_APP_USER,
        ORIGIN: "I",
        DATA: {
            SUPPLIER_ID: supplierId,
            START_DATE: startDate,
            END_DATE: endDate
        }
    }).then(res =>
        resolve(res.data.ARRAY)
    ).catch(error => {
        console.error('getPaymentList', error)
        return reject('Ha ocurrido un error inesperado, por favor vuelva a intentarlo.')
    })
})

export const getPaymentPDF = (supplierId, paymentIndicator, paymentDate) =>  new Promise((resolve, reject) => {
    requestToSAP(`${process.env.REACT_APP_URL_API_ERP}/clovit/ws_rest?sap-client=300&method=GET_SUPPLIER_PAYMENT_PDF&object=Account`, {
        ID: supplierId,
        USER: process.env.REACT_APP_USER,
        ORIGIN: "I",
        DATA: {
            SUPPLIER_ID: supplierId,
            PAYMENT_INDICATOR: paymentIndicator,
            PAYMENT_DATE: paymentDate
        }
    }).then(res => {
        if(res.data.ARRAY.STATUS === 'S') {
            resolve(JSON.parse(res.data.ARRAY.DATA).ARRAY)
        } else {
            reject(res.data.ARRAY.MESSAGE)
        }
    }).catch(error => {
        console.error('getPaymentPDF', error)
        return reject('Ha ocurrido un error inesperado, por favor vuelva a intentarlo.')
    })
})