import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './styles/Header.scss'

const Header = ({ supplierData, setSupplierData }) => {

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    useEffect(() => {
        const $mobileMenuLinks = document.querySelectorAll('.header .mobile-menu a')
        $mobileMenuLinks.forEach($link => $link.addEventListener('click', () => setShowMobileMenu(false)))
    }, [supplierData])

    return (
        <header className="header">
            <Container fluid>
                <Row>
                    <Col className="left">
                        <Link to="/profile">
                            <img src="https://www.decorceramica.com/arquivos/logo_decor_footer.png?v=637356928871300000" alt="Decor" />
                        </Link>
                    </Col>
                    <Col className="right d-none d-lg-flex">
                        {supplierData ?
                        <Navbar className="user-menu">
                            <Navbar.Toggle />
                            <Navbar.Collapse>
                                <Nav>
                                    <NavDropdown title={supplierData.BUSINESS_NAME} align="end">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Mis datos
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/account-status">
                                            <NavDropdown.Item>
                                                Estado de cuenta
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/payments">
                                            <NavDropdown.Item>
                                                Pagos
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/certificates">
                                            <NavDropdown.Item>
                                                Certificados
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/not-required-to-invoice">
                                            <NavDropdown.Item>
                                                Doc. No obligado a facturar
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => { sessionStorage.removeItem('supplierData'); setSupplierData(null) }}>
                                            Cerrar sesión
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar> :
                        <ul className="user-menu">
                            <li>
                                <Link to="/login">Iniciar sesión</Link>
                            </li>
                            <li>
                                <Link to="/register">Registrarse</Link>
                            </li>
                        </ul>}
                    </Col>
                    <Col className="right d-flex d-lg-none mobile">
                        <i className="fa-solid fa-bars" onClick={() => setShowMobileMenu(true)} />
                    </Col>
                </Row>
            </Container>
            <Nav className={`mobile-menu ${showMobileMenu ? 'd-flex' : 'd-none'}`}>
                <i className="fa-solid fa-xmark close" onClick={() => setShowMobileMenu(false)} />
                { supplierData ?
                <ul>
                    <li>
                        <Link to="/profile">
                            Mis datos
                        </Link>
                    </li>
                    <li>
                        <Link to="/account-status">
                            Estado de cuenta
                        </Link>
                    </li>
                    <li>
                        <Link to="/payments">
                            Pagos
                        </Link>
                    </li>
                    <li>
                        <Link to="/certificates">
                            Certificados
                        </Link>
                    </li>
                    <li>
                        <Link to="/not-required-to-invoice">
                            Doc. No obligado a facturar
                        </Link>
                    </li>
                    <NavDropdown.Item onClick={() => { sessionStorage.removeItem('supplierData'); setSupplierData(null) }}>
                        Cerrar sesión
                    </NavDropdown.Item>
                </ul> :
                <ul>
                    <li>
                        <Link to="/login">Iniciar sesión</Link>
                    </li>
                    <li>
                        <Link to="/register">Registrarse</Link>
                    </li>
                </ul>
                }
            </Nav>
        </header>
    )
}

export default Header