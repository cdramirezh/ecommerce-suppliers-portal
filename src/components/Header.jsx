import { Link } from 'react-router-dom'
import { Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar'

import './styles/Header.scss'

const Header = ({ supplierData, setSupplierData }) => {
    return (
        <header className="header">
            <div className="left">
                <Link to="/profile">
                    <img src="https://www.decorceramica.com/arquivos/logo_decor_footer.png?v=637356928871300000" alt="Decor" />
                </Link>
            </div>
            <div className="right">
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
                </ul>
                }
            </div>
        </header>
    )
}

export default Header