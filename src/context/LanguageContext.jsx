import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });
  const [translations, setTranslations] = useState({});
  const [enFallback, setEnFallback] = useState({});

  useEffect(() => {
    localStorage.setItem('lang', lang);
    
    // Load requested language and fallback (English)
    const loadTranslations = async () => {
      try {
        const fallback = await import('../i18n/en.json');
        setEnFallback(fallback.default || fallback);
        
        if (lang !== 'en') {
          const dict = await import(`../i18n/${lang}.json`);
          setTranslations(dict.default || dict);
        } else {
          setTranslations(fallback.default || fallback);
        }
      } catch (err) {
        console.error(`Failed to load translation for ${lang}`, err);
      }
    };
    
    loadTranslations();
  }, [lang]);

  // Nested key resolver: t('nav.navigate')
  const t = (key) => {
    const keys = key.split('.');
    
    let result = translations;
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        result = undefined;
        break;
      }
    }
    
    if (result !== undefined) return result;
    
    // Try fallback
    let fallbackResult = enFallback;
    for (const k of keys) {
      if (fallbackResult && fallbackResult[k]) {
        fallbackResult = fallbackResult[k];
      } else {
        fallbackResult = undefined;
        break;
      }
    }
    
    return fallbackResult !== undefined ? fallbackResult : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
