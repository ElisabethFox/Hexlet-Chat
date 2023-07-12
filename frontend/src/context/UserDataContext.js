import {createContext, useState} from "react";

export const UserDataContext = createContext({});

const UserDataContextProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const [userData, setUserData] = useState(currentUser);

    const logIn = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUserData(data);
    }

    const logOut = () => {
        localStorage.removeItem('user')
        setUserData(null)
    }

    const getUserName = () => userData.username;
    const getUserToken = () => userData.token;

    // const singIn - добавить

    return (
        <UserDataContext.Provider value={{ userData, logIn, logOut, getUserName, getUserToken }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContextProvider;
