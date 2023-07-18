import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import NotFound from '../pages/not-found/NotFound';
import NavBar from "./navbar/NavBar";
import Signup from '../pages/Signup';
import { ToastContainer } from 'react-toastify';

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
                <Routes>
                  <Route path="*" element={<NotFound />} />
                  <Route path="/" element={<ChatPage />}/>
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/signup" element={<Signup />}/>
                </Routes>
                  <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        />
                  <ToastContainer />
        </BrowserRouter>
  );
}

export default App;
