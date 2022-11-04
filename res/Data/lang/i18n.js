
import en from './en.json'
import ar from './ar.json'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import moment from "moment";
const resources = {
    en: {
        translation: en
    },
    ar: {
        translation: ar
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ar",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

const ChangeLanguage = () => {
    if (i18n.language == 'en')
        i18n.changeLanguage('ar');
    else
        i18n.changeLanguage('en');
    moment.locale(i18n.language);
}


export { i18n, ChangeLanguage };