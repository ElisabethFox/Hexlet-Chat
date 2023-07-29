import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import NavBar from './navbar/NavBar';
import Signup from '../pages/Signup';
import { appRoutes } from '../routes/routes';
import { useAuthorization } from '../hooks';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const AuthorizationRoute = ({ children }) => {
    const authorization = useAuthorization();
    return authorization.userData ? children : <Navigate to={appRoutes.loginPagePath()} />;
  };

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path={appRoutes.chatPagePath()}
          element={(
            <AuthorizationRoute>
              <Chat />
            </AuthorizationRoute>
          )}
        />
        <Route path={appRoutes.loginPagePath()} element={<Login />} />
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
