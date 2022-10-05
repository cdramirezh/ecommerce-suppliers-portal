import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import './App.scss'

const App = () => {

  const [supplierData, setSupplierData] = useState(sessionStorage.getItem('supplierData') ? JSON.parse(sessionStorage.getItem('supplierData')) : null)

  return (
    <BrowserRouter>
      <Header supplierData={supplierData} setSupplierData={setSupplierData} />
      <main className="main">
        <Routes>
          <Route path='/' element={<HomePage supplierData={supplierData} setSupplierData={setSupplierData} />} >
            <Route path='profile' element={<ProfilePage supplierData={supplierData} />} />
            <Route path='account-status' element={<></>} />
            <Route path='payments' element={<></>} />
            <Route path='certificates' element={<></>} />
            <Route path='not-required-to-invoice' element={<></>} />
          </Route>
          <Route path='/register' element={<RegisterPage supplierData={supplierData} setSupplierData={setSupplierData} />} />
          <Route path='/login' element={<LoginPage supplierData={supplierData} setSupplierData={setSupplierData} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
