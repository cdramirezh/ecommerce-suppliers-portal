import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './styles/Header.scss'

const Header = ({ supplierData, setSupplierData, menuData }) => {

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
                                        {menuData.map(menuItem => (
                                            <React.Fragment key={menuItem.title}>
                                                {menuItem.target === '/login' ? <NavDropdown.Divider key="separator" /> : null }
                                                <LinkContainer to={menuItem.target} onClick={menuItem.target === '/login' ? () => { sessionStorage.removeItem('supplierData'); setSupplierData(null) } : null}>
                                                    <NavDropdown.Item>
                                                        {menuItem.title}
                                                    </NavDropdown.Item>
                                                </LinkContainer>
                                            </React.Fragment>
                                        ))}
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
                    {menuData.map(menuItem =>
                        menuItem.target === '/login' ?
                            <NavDropdown.Item key={menuItem.title} onClick={() => { sessionStorage.removeItem('supplierData'); setSupplierData(null) }}>
                                {menuItem.title}
                            </NavDropdown.Item> :
                            <li key={menuItem.title}>
                                <Link to={menuItem.target}>
                                    {menuItem.title}
                                </Link>
                            </li>
                    )}
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