import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    // Home/Dashboard Page
    greeting: "Hello there,",
    guest: "Guest",
    appTitle: "Attendance Portal",
    todayStatus: "Today's Status",
    notCheckedIn: "Not checked in",
    checkIn: "Check In",
    checkOut: "Check Out",
    logout: "Logout",
    
    // Login Page
    welcomeBack: "Welcome Back",
    enterCredentials: "Please enter your credentials",
    nicNumber: "NIC Number",
    enterNic: "Enter your NIC",
    password: "Password",
    enterPassword: "Enter your password",
    login: "Login",
    forgotPassword: "Forgot Password?",
    
    // Common/Status
    error: "Error",
    loading: "Loading...",
    success: "Success"
  },
  
  si: {
    // Home/Dashboard Page
    greeting: "ආයුබෝවන්,",
    guest: "අමුත්තා",
    appTitle: "පැමිණීම් ද්වාරය",
    todayStatus: "අදට තත්ත්වය,",
    notCheckedIn: "තවම ඇතුළු වී නැත",
    checkIn: "ඇතුළු වන්න",
    checkOut: "පිටවන්න", 
    logout: "ඉවත් වන්න",
    
    // Login Page
    welcomeBack: "නැවත සාදරයෙන් පිළිගනිමු",
    enterCredentials: "කරුණාකර ඔබේ තොරතුරු ඇතුළත් කරන්න",
    nicNumber: "ජා.හැ.අ. අංකය",
    enterNic: "ඔබේ ජා.හැ.අ. අංකය ඇතුළත් කරන්න",
    password: "මුරපදය",
    enterPassword: "ඔබේ මුරපදය ඇතුළත් කරන්න",
    login: "ඇතුළු වන්න",
    forgotPassword: "මුරපදය අමතකද?",
    
    // Common/Status
    error: "දෝෂය",
    loading: "පූරණය වෙමින්...",
    success: "සාර්ථකයි"
  }
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem('lang');
      if (saved) setLang(saved);
    } catch (error) {
      console.log('Language load error:', error);
    }
    setIsLoaded(true);
  };

  const toggleLanguage = async () => {
    const newLang = lang === 'en' ? 'si' : 'en';
    setLang(newLang);
    try {
      await AsyncStorage.setItem('lang', newLang);
    } catch (error) {
      console.log('Language save error:', error);
    }
  };

  const t = (key) => translations[lang][key] || key;

  if (!isLoaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};