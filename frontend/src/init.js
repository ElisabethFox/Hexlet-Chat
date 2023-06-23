import i18next from "i18next";
import resources from './locales/index';

const defaultLanguage = 'ru';
export default async () => {
    const i18nInstance = i18next.createInstance();

    await i18nInstance.init({
        lng: defaultLanguage,
        debug: true,
        resources,
    })

}
