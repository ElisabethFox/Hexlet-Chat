import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";

import './App.css';
import Home from './pages/Home';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/NotFound';
import NavBar from "./components/navbar/NavBar";
import UserDataContextProvider from "./context/Provider";

function App() {
  // const HomePage = () => {
  //   if (logged) {
  //     return <Navigate to="/login" />
  //   } else {
  //     return <Home />
  //   }
  //
  // }

  const LoginPage = () => {
    if (localStorage.getItem('user') !== null) {
      return <Navigate to="/" />
    } else {
      return <Login />
    }
  };

  return (
        <BrowserRouter>
            <NavBar />
              <UserDataContextProvider>
                <Routes>
                  <Route path="*" element={<NotFound />} />
                  <Route path="/" element={<Home />}/>
                  <Route path="/login" element={<LoginPage />}/>
                </Routes>
              </UserDataContextProvider>
        </BrowserRouter>
  );
}

export default App;
