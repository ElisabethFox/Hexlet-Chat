import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/NotFound';
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
