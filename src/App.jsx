import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
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
        <Container>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/login' element={<LoginPage/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
