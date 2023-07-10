import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App';
import resources from './locales/index.js';
import {Provider} from "react-redux";
import store from "./slices";
import React from "react";
import SocketContextProvider from "./context/SocketContext";
import UserDataContextProvider from "./context/UserDataContextProvider";
import io from 'socket.io-client';

const defaultLanguage = 'ru';

const init = async () => {
    const i18n = i18next.createInstance();

    await i18n
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: defaultLanguage,
        });

    const socket = io ("/");

    return (
                <Provider store={store}>
                    <SocketContextProvider socket={socket}>
                        <UserDataContextProvider>
                            <I18nextProvider i18n={i18n}>
                                <App />
                            </I18nextProvider>
                        </UserDataContextProvider>
                    </SocketContextProvider>
                </Provider>
    );
};

export default init;
