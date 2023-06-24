import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';
import Login from './pages/Login';
import NotFound from './pages/not-found/NotFound';
import NavBar from "./components/navbar/NavBar";
import UserDataContextProvider from "./context/Provider";

function App() {
  const ChatPage = () => {
    if (localStorage.getItem('user') === null) {
      return <Navigate to="/login" />
    } else {
      return <Chat />
    }

  }

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
                  <Route path="/" element={<ChatPage />}/>
                  <Route path="/login" element={<LoginPage />}/>
                </Routes>
              </UserDataContextProvider>
        </BrowserRouter>
  );
}

export default App;
