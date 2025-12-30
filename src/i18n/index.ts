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

export default i18n;

export const setLocale = (locale: 'en' | 'tr') => {
  i18n.locale = locale;
};

export const getLocale = (): string => {
  return i18n.locale;
};
