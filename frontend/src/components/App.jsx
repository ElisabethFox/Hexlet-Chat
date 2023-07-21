import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import NavBar from './navbar/NavBar';
import Signup from '../pages/Signup';
import { appRoutes } from '../routes/routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const ChatPage = () => {
    if (localStorage.getItem('user') === null) {
      return <Navigate to={appRoutes.loginPagePath()} />;
    }

    return <Chat />;
  };

  const LoginPage = () => {
    if (localStorage.getItem('user') !== null) {
      return <Navigate to={appRoutes.chatPagePath()} />;
    }

    return <Login />;
  };

  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={appRoutes.notFoundPagePath()} element={<NotFound />} />
          <Route path={appRoutes.chatPagePath()} element={<ChatPage />} />
          <Route path={appRoutes.loginPagePath()} element={<LoginPage />} />
          <Route path={appRoutes.signupPagePath()} element={<Signup />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
  );
};

export default App;
