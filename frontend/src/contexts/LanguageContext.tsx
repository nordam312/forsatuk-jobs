import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'ar'
  );

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);

    // تحديث اتجاه الصفحة
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // تحديث الخط
    if (lang === 'ar') {
      document.documentElement.style.fontFamily = "'Cairo', 'Tajawal', 'Segoe UI', system-ui, sans-serif";
    } else {
      document.documentElement.style.fontFamily = "'Inter', 'Segoe UI', system-ui, sans-serif";
    }
  };

  useEffect(() => {
    // تطبيق الإعدادات الأولية
    setLanguage(language);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};