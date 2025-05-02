// locales/i18n.js
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './en';
import si from './si';

const i18n = new I18n({
  en,
  si,
});

// Set the locale once at the beginning of your app
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fall back to another language with the key
i18n.enableFallback = true;

export default i18n;