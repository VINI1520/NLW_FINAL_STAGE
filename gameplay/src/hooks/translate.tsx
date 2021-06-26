import AsyncStorage from '@react-native-async-storage/async-storage';
import React,
{
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import { COLLECTION_LANGUAGE } from '../configs/database';

import '../configs/i18n';
import { useTranslation } from 'react-i18next';
import i18n from '../configs/i18n';

type Language = {
    id: string;
  }

type TranslateProviderProps = {
    children: ReactNode;
  }

type TranslateContextData = {
    language: Language;
    changeLanguage: (item: string) => Promise<void>;
  }


  
export const TranslateContext = createContext({} as TranslateContextData);

function TranslateProvider({ children }: TranslateProviderProps) {
    const [language, setLanguage] = useState<Language>({} as Language);
    const { t } = useTranslation(); 
        
    const defaulLanguage = 'en';

    //console.log(useTranslate('components.Profile.greeting'));

    async function changeLanguage(languageID: string) {
        var newLanguage :Language = {} as Language;

        newLanguage.id = languageID;

        await AsyncStorage.setItem(COLLECTION_LANGUAGE, JSON.stringify(newLanguage));
        setLanguage(newLanguage);
    }

    async function loadLanguageStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_LANGUAGE);
    
        if (storage) {
            const userLanguage = JSON.parse(storage) as Language;
            setLanguage(userLanguage);
        }
        else {
            changeLanguage(defaulLanguage);
        }
    }

    async function defineLanguagei18n(item: string) {
      if(i18n.language != item)
        i18n.changeLanguage(item);
    }

    useEffect(() => {
        loadLanguageStorageData();
      }, []);

      useEffect(() => {
        defineLanguagei18n(language.id);
      }, [language]);

    return (
        <TranslateContext.Provider value={{
          language,
          changeLanguage
        }}>
          {children}
        </TranslateContext.Provider>
      )

}


function useTranslate() {
    const context = useContext(TranslateContext);
  
    return context;
}

function runTranslate(item: string) {
  const { t } = useTranslation();
  return t(item);
}

function getAtualLanguage() {
  const atualLanguage = runTranslate('languages.'+i18n.language);
  return atualLanguage;
}


export {
  TranslateProvider,
  useTranslate,
  runTranslate,
  getAtualLanguage
}