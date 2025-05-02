import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Safe import for expo-localization
let Localization;
try {
  Localization = require('expo-localization');
} catch (error) {
  console.warn('expo-localization not available, using default language');
  Localization = { locale: 'en' }; // Default to English if package not available
}

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('userLanguage');

                if (savedLanguage) {
                    setLanguage(savedLanguage);
                } else {
                    const deviceLanguage = Localization.locale.startsWith('si') ? 'si' : 'en';
                    setLanguage(deviceLanguage);
                }
            } catch (error) {
                console.error('Error loading language:', error);
            }
        };

        loadLanguage();
    }, []);

    const changeLanguage = async (newLanguage) => {
        try {
            await AsyncStorage.setItem('userLanguage', newLanguage);
            setLanguage(newLanguage);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = React.useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};