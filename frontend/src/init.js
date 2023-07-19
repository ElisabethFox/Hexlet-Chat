import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App';
import resources from './locales/index.js';
import {Provider} from "react-redux";
import store from "./slices";
import React from "react";
import ChatContextProvider from "./context/ChatContext";
import UserDataContextProvider from "./context/UserDataContext";
import io from 'socket.io-client';
import LeoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const defaultLanguage = 'ru';

const init = async () => {
    const i18n = i18next.createInstance();

    await i18n
        .use(initReactI18next)
        .init({
            debug: true,
            resources,
            fallbackLng: defaultLanguage,
            interpolation: {
                escapeValue: false, // экранирование уже есть в React, поэтому отключаем
              },
        });

    const socket = io('/', { autoConnect: false });

    const profanityFilter = LeoProfanity;
    profanityFilter.add(profanityFilter.getDictionary(defaultLanguage));

    const rollbarConfig = {
        accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
        payload: {
          environment: 'production',
        },
        captureUncaught: true,
        captureUnhandledRejections: true,
    };

    return (
                <Provider store={store}>
                    <RollbarProvider config={rollbarConfig}>
                    <ErrorBoundary>
                        <UserDataContextProvider>
                            <ChatContextProvider socket={socket}>
                            <I18nextProvider i18n={i18n}>
                            <App />
                            </I18nextProvider>
                            </ChatContextProvider>
                        </UserDataContextProvider>
                    </ErrorBoundary>   
                    </RollbarProvider> 
                </Provider>
    );
};

export default init;
