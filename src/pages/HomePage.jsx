import { useEffect } from "react"
import { useState, useRef } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

import './styles/HomePage.scss'

const HomePage = ({ supplierData, setSupplierData }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [hiddenMenu, setHiddenMenu] = useState(false)
    const $menu = useRef(null)

    const toggleMenu = () => {
        $menu.current.classList.toggle('hidden')
        setHiddenMenu(!hiddenMenu)
    }

    useEffect(() => {
        if(!supplierData) {
            navigate('/login')
        }
    })

    return (
        <div className="home-page">
            <aside className="menu d-none d-lg-block" ref={$menu}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/profile">
                                <i className="fa-solid fa-user" /><span className={location.pathname === '/profile' ? 'active' : ''}>Mis datos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pending-invoices">
                                <i className="fa-solid fa-receipt" /><span className={location.pathname === '/pending-invoices' ? 'active' : ''}>Estado de cuenta</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/payments">
                                <i className="fa-solid fa-money-bill" /><span className={location.pathname === '/payments' ? 'active' : ''}>Pagos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/certificates">
                                <i className="fa-solid fa-file" /><span className={location.pathname === '/certificates' ? 'active' : ''}>Certificados</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/not-required-to-invoice">
                                <i className="fa-sharp fa-solid fa-file-invoice" /><span className={location.pathname === '/not-required-to-invoice' ? 'active' : ''}>Doc. No obligado a facturar</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={() => { sessionStorage.removeItem('supplierData'); setSupplierData(null) }}>
                                <i className="fa-solid fa-right-from-bracket" /><span>Cerrar sesión</span>
                            </Link>
                        </li>
                        <li>
                            <div className="circle" onClick={toggleMenu}>
                                {hiddenMenu ? <i className="fas fa-chevron-right" /> : <i className="fas fa-chevron-left" />}
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>
            <Outlet />
        </div>
    )
}

export default HomePage