import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import './styles/Footer.scss'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'

let ShouldAddListeners = true

const replaceClass = (element, oldClass, newClass) => {
    element.classList.add(newClass, true)
    element.classList.remove(oldClass, true)
}

const Footer = () => {

    useEffect(() => {
        const $details = document.querySelectorAll("details")

        if (ShouldAddListeners) {
            $details.forEach($detail => {
                const $summary = $detail.querySelector("summary")
                $summary.addEventListener('click', (e) => expand(e, $details))
            })
            ShouldAddListeners = false
        }
    }, [])

    const expand = (e, $details) => {
        $details.forEach(($detail) => {
            $detail.removeAttribute("open")
            $detail.querySelector("i").classList.add("fa-chevron-down", true)
            $detail.querySelector("i").classList.remove("fa-chevron-up", true)
        })

        let reverse = {"fa-chevron-down": "fa-chevron-up","fa-chevron-up": "fa-chevron-down"}
        const $icon = e.target.querySelector("i") || e.target
        let className = $icon.classList[1]
        replaceClass($icon, className, reverse[className])
    }

    return (
        <footer className="footer">
            <div className="up">
                <Container fluid>
                    <Row>
                        <a href="https://www.decorceramica.com" target="_blank" rel="noreferrer">
                            <Image src='https://www.decorceramica.com/arquivos/logo_decor_footer.png?v=637356928871300000' />
                        </a>
                    </Row>
                    <Row className="d-none d-lg-flex desktop">
                        <Col>
                            <span>PLANIFICA TU COMPRA</span>
                            <ul>
                                <li>
                                    <a href="https://www.decorceramica.com/como-comprar-producto" target="_blank" rel="noreferrer">Cómo comprar por producto</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/como-comprar" target="_blank" rel="noreferrer">Cómo comprar por espacio</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/como-comprar/en-decorceramica" target="_blank" rel="noreferrer">Cómo Comprar en DECORCERAMICA</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/galeria-catalogos" target="_blank" rel="noreferrer">Catálogos y Folletos</a>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <span>SERVICIOS</span>
                            <ul>
                                <li>
                                    <a href="https://tupersonalhouser.com/" target="_blank" rel="noreferrer">Personal Houser</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/formas-de-pago" target="_blank" rel="noreferrer">Formas de Pago</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/formas-de-entrega" target="_blank" rel="noreferrer">Formas de Entrega</a>
                                </li>
                                <li>
                                    <a href="https://decorceramica.wpengine.com/pse/login/" target="_blank" rel="noreferrer">Pago en linea <img id="pse" src="https://decorceramica.vteximg.com.br/arquivos/logo-PSE.png?v=637436783952170000" alt="PSE" /></a>
                                </li>
                                <li>
                                    <a href="https://decorceramica.wpengine.com/decorclub/" target="_blank" rel="noreferrer">Programa de Beneficios (DecorClub)</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/decor-alianzas" target="_blank" rel="noreferrer">Programa de Beneficios (Decor Alianzas)</a>
                                </li>
                                <li>
                                    <a href="https://decorceramica.wpengine.com/arquitectura/" target="_blank" rel="noreferrer">Arquitectura y construcción</a>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <span>CONTACTO Y AYUDA</span>
                            <ul>
                                <li>
                                    <a href="http://citaentrega.grupodecor.com:8888/" target="_blank" rel="noreferrer">Reserva de Citas recogida en Bodega</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/cambios-devoluciones" target="_blank" rel="noreferrer">Cambios y Devoluciones</a>
                                </li>
                                <li>
                                    <a href="https://decorceramica.wpengine.com/documentos-de-garantia/" target="_blank" rel="noreferrer">Solicitud de Garantías</a>
                                </li>
                                <li>
                                    <a href="https://decorceramica.wpengine.com/soporte-tecnico/" target="_blank" rel="noreferrer">Soporte técnico</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/te-escuchamos" target="_blank" rel="noreferrer">Te Escuchamos</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/preguntas-frecuentes" target="_blank" rel="noreferrer">Preguntas Frecuentes</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/nuestras-tiendas" target="_blank" rel="noreferrer">Nuestras Tiendas</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/venta-telefonica" target="_blank" rel="noreferrer">Venta Telefónica</a>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <span>NUESTRA COMPAÑÍA</span>
                            <ul>
                                <li>
                                    <a href="https://www.decorceramica.com/nosotros" target="_blank" rel="noreferrer">Sobre nosotros</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/centros-logisticos" target="_blank" rel="noreferrer">Centros Logísticos</a>
                                </li>
                                <li>
                                    <a href="https://blog.decorceramica.com/category/actualidad/" target="_blank" rel="noreferrer">Actualidad:(Prensa)</a>
                                </li>
                                <li>
                                    <a href="https://www.elempleo.com/sitios-empresariales/colombia/decorceramica/" target="_blank" rel="noreferrer">Únete a nuestro equipo</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/politica-de-datos-personales" target="_blank" rel="noreferrer">Política para el Tratamiento de Datos Personales</a>
                                </li>
                                <li>
                                    <a href="https://www.decorceramica.com/terminos-y-condiciones" target="_blank" rel="noreferrer">Términos y condiciones para venta online</a>
                                </li>
                                <li>
                                    <a href="https://grupodecor.sharepoint.com/sites/schoolhomepage" target="_blank" rel="noreferrer">Universidad Decor</a>
                                </li>
                                <li>
                                    <a href="http://colaboradoresdecor.decorceramica.com:8080/Empleados/index.decor" target="_blank" rel="noreferrer">Portal de Colaboradores</a>
                                </li>
                                <li>
                                    <a href="https://decorceramica.wpengine.com/files/FA-MAN-002-Manual-Programa-de-Transparencia-y-%C3%89tica-Empresarial-V02.pdf" target="_blank" rel="noreferrer">Manual de transparencia y ética empresarial</a>
                                </li>
                                <li>
                                    <a href="https://decorceramica.wpengine.com/files/FA-FTO-089-Formato-de-Reporte-Canales-de-Comunicaci%C3%B3n-y-Orientaci%C3%B3n-L%C3%ADnea-%C3%89tica-V02.xls" target="_blank" rel="noreferrer">Reporte canales de denuncia</a>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <div className="icons">
                                <img src="https://www.decorceramica.com/arquivos/brand-2.png?v=637353680944600000" alt="Logo Decor" />
                                <p>Encuéntranos en nuestras redes sociales</p>
                                <ul>
                                    <li>
                                        <a href="https://www.facebook.com/IdeasDECORCERAMICA" target="_blank" rel="noreferrer">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/decorceramica_oficial/" target="_blank" rel="noreferrer">
                                            <i className="fab fa-instagram"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=573142387198&text=%C2%A1Hola!" target="_blank" rel="noreferrer">
                                            <i className="fab fa-whatsapp"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.pinterest.es/decorceramica/_created/" target="_blank" rel="noreferrer">
                                            <i className="fab fa-pinterest-p"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/user/IDEASDECOR" target="_blank" rel="noreferrer">
                                            <i className="fab fa-youtube"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/DECORtweet" target="_blank" rel="noreferrer">
                                            <i className="fab fa-twitter"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex d-lg-none mobile">
                        <Col>
                            <ul>
                                <li>
                                    <details>
                                        <summary>
                                            <span><i className="fa-solid fa-chevron-down" />PLANIFICA TU COMPRA</span>
                                        </summary>
                                        <ul>
                                            <li>
                                                <a href="https://www.decorceramica.com/como-comprar-producto" target="_blank" rel="noreferrer">Cómo comprar por producto</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/como-comprar" target="_blank" rel="noreferrer">Cómo comprar por espacio</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/como-comprar/en-decorceramica" target="_blank" rel="noreferrer">Cómo Comprar en DECORCERAMICA</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/galeria-catalogos" target="_blank" rel="noreferrer">Catálogos y Folletos</a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary>
                                            <span><i className="fa-solid fa-chevron-down" />SERVICIOS</span>
                                        </summary>
                                        <ul>
                                            <li>
                                                <a href="https://tupersonalhouser.com/" target="_blank" rel="noreferrer">Personal Houser</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/formas-de-pago" target="_blank" rel="noreferrer">Formas de Pago</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/formas-de-entrega" target="_blank" rel="noreferrer">Formas de Entrega</a>
                                            </li>
                                            <li>
                                                <a href="https://decorceramica.wpengine.com/pse/login/" target="_blank" rel="noreferrer">Pago en linea <img id="pse" src="https://decorceramica.vteximg.com.br/arquivos/logo-PSE.png?v=637436783952170000" alt="PSE" /></a>
                                            </li>
                                            <li>
                                                <a href="https://decorceramica.wpengine.com/decorclub/" target="_blank" rel="noreferrer">Programa de Beneficios (DecorClub)</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/decor-alianzas" target="_blank" rel="noreferrer">Programa de Beneficios (Decor Alianzas)</a>
                                            </li>
                                            <li>
                                                <a href="https://decorceramica.wpengine.com/arquitectura/" target="_blank" rel="noreferrer">Arquitectura y construcción</a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary>
                                            <span><i className="fa-solid fa-chevron-down" />CONTACTO Y AYUDA</span>
                                        </summary>
                                        <ul>
                                            <li>
                                                <a href="http://citaentrega.grupodecor.com:8888/" target="_blank" rel="noreferrer">Reserva de Citas recogida en Bodega</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/cambios-devoluciones" target="_blank" rel="noreferrer">Cambios y Devoluciones</a>
                                            </li>
                                            <li>
                                                <a href="https://decorceramica.wpengine.com/documentos-de-garantia/" target="_blank" rel="noreferrer">Solicitud de Garantías</a>
                                            </li>
                                            <li>
                                                <a href="https://decorceramica.wpengine.com/soporte-tecnico/" target="_blank" rel="noreferrer">Soporte técnico</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/te-escuchamos" target="_blank" rel="noreferrer">Te Escuchamos</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/preguntas-frecuentes" target="_blank" rel="noreferrer">Preguntas Frecuentes</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/nuestras-tiendas" target="_blank" rel="noreferrer">Nuestras Tiendas</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/venta-telefonica" target="_blank" rel="noreferrer">Venta Telefónica</a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary>
                                            <span><i className="fa-solid fa-chevron-down" />NUESTRA COMPAÑÍA</span>
                                        </summary>
                                        <ul>
                                            <li>
                                                <a href="https://www.decorceramica.com/nosotros" target="_blank" rel="noreferrer">Sobre nosotros</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/centros-logisticos" target="_blank" rel="noreferrer">Centros Logísticos</a>
                                            </li>
                                            <li>
                                                <a href="https://blog.decorceramica.com/category/actualidad/" target="_blank" rel="noreferrer">Actualidad:(Prensa)</a>
                                            </li>
                                            <li>
                                                <a href="https://www.elempleo.com/sitios-empresariales/colombia/decorceramica/" target="_blank" rel="noreferrer">Únete a nuestro equipo</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/politica-de-datos-personales" target="_blank" rel="noreferrer">Política para el Tratamiento de Datos Personales</a>
                                            </li>
                                            <li>
                                                <a href="https://www.decorceramica.com/terminos-y-condiciones" target="_blank" rel="noreferrer">Términos y condiciones para venta online</a>
                                            </li>
                                            <li>
                                                <a href="https://grupodecor.sharepoint.com/sites/schoolhomepage" target="_blank" rel="noreferrer">Universidad Decor</a>
                                            </li>
                                            <li>
                                                <a href="http://colaboradoresdecor.decorceramica.com:8080/Empleados/index.decor" target="_blank" rel="noreferrer">Portal de Colaboradores</a>
                                            </li>
                                            <li>
                                                <a href="https://decorceramica.wpengine.com/files/FA-MAN-002-Manual-Programa-de-Transparencia-y-%C3%89tica-Empresarial-V02.pdf" target="_blank" rel="noreferrer">Manual de transparencia y ética empresarial</a>
                                            </li>
                                            <li>
                                                <a href="https://decorceramica.wpengine.com/files/FA-FTO-089-Formato-de-Reporte-Canales-de-Comunicaci%C3%B3n-y-Orientaci%C3%B3n-L%C3%ADnea-%C3%89tica-V02.xls" target="_blank" rel="noreferrer">Reporte canales de denuncia</a>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className="d-flex d-lg-none">
                        <Col>
                            <div className="icons m-auto">
                                <img src="https://www.decorceramica.com/arquivos/brand-2.png?v=637353680944600000" alt="Logo Decor" />
                                <p>Encuéntranos en nuestras redes sociales</p>
                                <ul>
                                    <li>
                                        <a href="https://www.facebook.com/IdeasDECORCERAMICA" target="_blank" rel="noreferrer">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/decorceramica_oficial/" target="_blank" rel="noreferrer">
                                            <i className="fab fa-instagram"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=573142387198&text=%C2%A1Hola!" target="_blank" rel="noreferrer">
                                            <i className="fab fa-whatsapp"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.pinterest.es/decorceramica/_created/" target="_blank" rel="noreferrer">
                                            <i className="fab fa-pinterest-p"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/user/IDEASDECOR" target="_blank" rel="noreferrer">
                                            <i className="fab fa-youtube"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/DECORtweet" target="_blank" rel="noreferrer">
                                            <i className="fab fa-twitter"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bottom">
                <span>Desarrollado por Clovit</span>
            </div>
        </footer>
    )
}

export default Footer