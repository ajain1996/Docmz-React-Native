import I18n from 'react-native-i18n';
import en from './locales/en.json';
import hi from './locales/hi.json';

I18n.fallbacks = true;
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = 'en';
I18n.locale = 'en';

I18n.translations = {
  hi,
  en,
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};
export function Local(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
