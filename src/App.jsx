import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import HomePage from './pages/HomePage';

import './App.scss'

const App = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Container>
          <Routes>
            <Route path='/' element={<HomePage/>} />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
