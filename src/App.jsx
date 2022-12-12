import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PendingInvoicesPage from './pages/PendingInvoicesPage';
import PaymentsPage from './pages/PaymentsPage';
import CertificatesPage from './pages/CertificatesPage';
import EquivalentDocumentPage from './pages/EquivalentDocumentPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import NotFoundPage from './pages/NotFoundPage';

import './App.scss'

const App = () => {

  const [supplierData, setSupplierData] = useState(sessionStorage.getItem('supplierData') ? JSON.parse(sessionStorage.getItem('supplierData')) : null)
  const menuData = [
    {
      title: "Mis datos",
      target: "/profile",
      icon: "fa-solid fa-user"
    },
    {
      title: "Estado de cuenta",
      target: "/pending-invoices",
      icon: "fa-solid fa-receipt"
    },
    {
      title: "Pagos",
      target: "/payments",
      icon: "fa-solid fa-money-bill"
    },
    {
      title: "Certificados",
      target: "/certificates",
      icon: "fa-solid fa-file"
    },
    {
      title: "Documento equivalente",
      target: "/equivalent-document",
      icon: "fa-sharp fa-solid fa-file-invoice"
    },
    {
      title: "Cerrar sesión",
      target: "/login",
      icon: "fa-solid fa-right-from-bracket"
    }
  ]

  return (
    <BrowserRouter>
      <Header supplierData={supplierData} setSupplierData={setSupplierData} menuData={menuData} />
      <main className="main">
        <Container fluid>
          <Routes>
            <Route path='/' element={<HomePage supplierData={supplierData} setSupplierData={setSupplierData} menuData={menuData} />} >
              <Route path='profile' element={<ProfilePage supplierData={supplierData} />} />
              <Route path='pending-invoices' element={<PendingInvoicesPage supplierData={supplierData} />} />
              <Route path='payments' element={<PaymentsPage supplierData={supplierData} />} />
              <Route path='certificates' element={<CertificatesPage supplierData={supplierData} />} />
              <Route path='equivalent-document' element={<EquivalentDocumentPage supplierData={supplierData} />} />
            </Route>
            <Route path='/register' element={<RegisterPage supplierData={supplierData} setSupplierData={setSupplierData} />} />
            <Route path='/login' element={<LoginPage supplierData={supplierData} setSupplierData={setSupplierData} />} />
            <Route path='/recover_session' element={<ForgotPasswordPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;