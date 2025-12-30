import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en.json';
import tr from './tr.json';

const i18n = new I18n({
  en,
  tr,
});

// Set the locale once at the beginning of your app
const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
i18n.locale = deviceLocale;

// Allow fallback to 'en' if a translation is missing
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

interface I18nContextType {
  locale: 'en' | 'tr';
  setLocale: (locale: 'en' | 'tr') => void;
  t: (key: string, options?: any) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<'en' | 'tr'>(
    (deviceLocale === 'tr' ? 'tr' : 'en') as 'en' | 'tr'
  );
  const [key, setKey] = useState(0);

  useEffect(() => {
    i18n.locale = locale;
    // Force re-render by updating key
    setKey(prev => prev + 1);
  }, [locale]);

  const setLocale = (newLocale: 'en' | 'tr') => {
    if (locale !== newLocale) {
      setLocaleState(newLocale);
      i18n.locale = newLocale;
      // Force re-render
      setKey(prev => prev + 1);
    }
  };

  const t = (key: string, options?: any) => {
    return i18n.t(key, options);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      <React.Fragment key={key}>
        {children}
      </React.Fragment>
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

// Export default i18n for backward compatibility
export default i18n;

