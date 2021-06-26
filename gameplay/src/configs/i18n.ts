import i18n from 'i18next';
//import ns1 from './en/ns1.json';
//import ns2 from './en/ns2.json';
import portuguese from '../global/languages/portuguese.json';
import english from '../global/languages/english.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        translation: english,
    },
    pt: {
        translation: portuguese,
    },
  } as const;
  
  if(!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      lng: 'en',
      resources,
      debug: false
    });
  }
  /*
  i18next.use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
});
*/


  export default i18n