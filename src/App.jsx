import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import './App.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path='/' element={<HomePage/>} >
            <Route path='profile' element={<></>} />
            <Route path='account-status' element={<></>} />
            <Route path='payments' element={<></>} />
            <Route path='certificates' element={<></>} />
            <Route path='not-required-to-invoice' element={<></>} />
          </Route>
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
