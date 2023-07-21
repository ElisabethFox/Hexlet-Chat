import React from 'react';
import io from 'socket.io-client';
import i18next from 'i18next';
import LeoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import ChatContextProvider from './context/ChatContext';
import UserDataContextProvider from './context/UserDataContext';
import store from './slices';
import App from './components/App';
import resources from './locales/index.js';

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
        escapeValue: false,
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
