import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Autorization from './pages/Autorization';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Autorization />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
