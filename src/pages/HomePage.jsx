import { useEffect } from "react"
import { useState, useRef } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

import './styles/HomePage.scss'

const HomePage = ({ supplierData, setSupplierData, menuData }) => {

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
                        {menuData.map(menuItem => (
                            <li key={menuItem.title}>
                                <Link to={menuItem.target} onClick={menuItem.target=== '/login' ? () => { sessionStorage.removeItem('supplierData'); setSupplierData(null) } : null}>
                                    <i className={menuItem.icon} /><span className={location.pathname === menuItem.target ? 'active' : ''}>{menuItem.title}</span>
                                </Link>
                            </li>
                        ))}
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