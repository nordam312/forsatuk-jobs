import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en/translation.json';
import arTranslations from './locales/ar/translation.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar', // العربية كلغة افتراضية
    lng: localStorage.getItem('language') || 'ar',

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },
  });

// تحديد اتجاه الصفحة حسب اللغة
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.dir = dir;
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lng);

  // حفظ اللغة في localStorage
  localStorage.setItem('language', lng);

  // تحديث الخط حسب اللغة
  if (lng === 'ar') {
    document.documentElement.style.fontFamily = "'Cairo', 'Segoe UI', system-ui, sans-serif";
  } else {
    document.documentElement.style.fontFamily = "'Inter', 'Segoe UI', system-ui, sans-serif";
  }
});

export default i18n;