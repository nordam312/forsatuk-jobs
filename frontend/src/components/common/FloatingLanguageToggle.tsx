import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingLanguageToggle: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50`}>
      {/* Language options */}
      {isOpen && (
        <div className={`absolute bottom-16 ${isRTL ? 'left-0' : 'right-0'} bg-white rounded-lg shadow-xl border p-2 min-w-[140px] animate-fade-in`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'ar' | 'en');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                language === lang.code ? 'bg-primary-teal/10 text-primary-teal' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg bg-gradient-primary hover:opacity-90 transition-all hover:scale-110"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Globe className="w-5 h-5 text-white" />
        )}
      </Button>
    </div>
  );
};

export default FloatingLanguageToggle;