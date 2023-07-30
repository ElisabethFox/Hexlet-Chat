import { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unload } from '../slices/loadingSlice';

export const UserDataContext = createContext({});

const UserDataContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;
  const [userData, setUserData] = useState(currentUser);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUserData(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    dispatch(unload());
    setUserData(null);
  };

  const getUserName = () => userData.username;

  return (
    <UserDataContext.Provider value={{
      userData, logIn, logOut, getUserName,
    }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
