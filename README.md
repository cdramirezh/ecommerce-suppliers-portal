# Portal de proveedores

Permite que los proveedores de Grupo Decor puedan interactuar o autogestionar algunos temas de interes en la compañía teninedo a su disposición los siguientes módulos:

- **Mis Datos:**\
Permite visualizar los datos que la compañía tiene del proveedor y validar que se encuentren correctos.\
En la parte inferior, podrá visualizar un mensaje con el correo electrónico al que se puede solicitar la corrección de los datos.
- **Estado de cuenta:**\
Permite visualizar las facturas que el proveedor tiene pendientes, es decir, las facturas que tiene activas y no le han realizado el pago.
- **Pagos:**\
Permite visualizar los pagos que le han realizado en el periodo de tiempo solicitado y visualizar el detalle del pago a través de un archivo en PDF.
- **Certificados:**\
Permite que el proveedor obtenga los siguientes certificados en una archivo PDF a través de un rango de fechas:
    * Retención en la fuente renta
    * Retención de industria y comercio
    * Retención de IVA
- **Documento equivalente:**\
Permite que los proveedores que no están obligados facturar, obtengan un documento equivalente en formato PDF de sus facturas registradas.

## Requisitos de configuración para el funcionamiento de la aplicación

* Crear archivo denominado `.env.local` en la raíz del proyecto con las siguientes variables:

    - **REACT_APP_URL_API_MOVILIDAD:** Url del sistema de movilidad. Ejemplo: `https://<host>:<post>`
    - **REACT_APP_URL_API_ERP:** Url del sistema de SAP ERP. Ejemplo: `https://<host>:<post>`
    - **REACT_APP_URL_API_CRM:** Url del sistema de SAP CRM. Ejemplo: `https://<host>:<post>`
    - **REACT_APP_USER:** Nombre de usuario para las peticiones del sistema. Ejemplo: `MOVILIDAD`

    **Nota:** El formato del contenido del archivo para cada variable debe ser el siguiente:\
    `<VARIABLE_NAME> = <VALUE>`

* Configurar tabla en SAP ERP con las clases de documentos que serán usados para los móduos de Estado de cuenta y Pagos:

    Acceder al sistema de SAP ERP y configurar a través de la transacción SM30 la tabla 'ZSUP_DOC_TYPE - Portal Proveedores: Clase de documentos' y agregar las clases de documentos requeridas. Para el proyecto, inicialmente se han definido las siguientes clases de documentos:

    - AB
    - AE
    - AP
    - AR
    - KG
    - KR
    - NC
    - ND
    - NE
    - NR
    - RE
    - SA


## Comandos disponibles

En el directorio del proyecto puede ejecutar los siguientes comandos:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre la URL [http://localhost:3000](http://localhost:3000) para ver la aplicación en el navegador.

La página recargara cuando realice cambios.\
También puede ver cualquier error  en la consola.

### `npm run build`

Construye los archivos finales de la aplicación para producción en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.
La compilación se minimiza y los nombres de archivo incluyen los hashes.