import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    // Home/Dashboard Page
    greeting: "Hello there,",
    guest: "Guest",
    // appTitle: "Attendance Portal",
    todayStatus: "Today's Status",
    notCheckedIn: "Not checked in",
    checkIn: "Check In",
    checkOut: "Check Out",
    logout: "Logout",
    todaysDuty: "Today's Duty",
    noDuty: "No duty assigned for today",
    locationStatus: "Location Status",
    checkNow: "Check Now",
    checking: "Checking...",
    inRange: "IN RANGE",
    outOfRange: "OUT OF RANGE",
    noLocationCheck: "No location check performed yet",
    noLocationDuty: "No duty assigned - location check unavailable",
    checkingLocation: "Checking location...",
    quickActions: "Duty Actions",
    alreadyCheckedIn: "Already Checked In",
    alreadyCheckedOut: "Already Checked Out",
    checkInFirst: "Check In First",
    areYouSureLogout: "Are you sure?",
    location: "Location",
    areYouSureCheckIn: "Are you sure you want to check in?",
    areYouSureCheckOut: "Are you sure you want to check out?",
    // cancel: "Cancel",

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
    // appTitle: "පැමිණීම් ද්වාරය",
    todayStatus: "අදට තත්ත්වය",
    notCheckedIn: "තවම ඇතුළු වී නැත",
    checkIn: "පැමිණිම",
    checkOut: "පිටවීම",
    logout: "ඉවත් වන්න",
    todaysDuty: "දෛනික රාජකාරී",
    noDuty: "අදට රාජකාරී නියම කර නැත",
    locationStatus: "ස්ථාන තත්ත්වය",
    checkNow: "පරීක්ෂා කරන්න",
    checking: "පරීක්ෂා වෙමින්...",
    inRange: "සීමාවේ සිටී",
    outOfRange: "සීමාවෙන් පිටත",
    noLocationCheck: "තවම ස්ථාන පරීක්ෂාව සිදු කර නැත",
    noLocationDuty: "රාජකාරී නොමැති නිසා ස්ථාන පරීක්ෂාව නොමැත",
    checkingLocation: "ස්ථානය පරීක්ෂා වෙමින්...",
    quickActions: "රාජකාරි සටහන්",
    alreadyCheckedIn: "පැමිණියා",
    alreadyCheckedOut: "පිටවුණා",
    checkInFirst: "පළමුව පැමිණීම සටහන් කරන්න",
    areYouSureLogout: "ඔබට විශ්වාසද?",
    location: "ස්ථානය",
    areYouSureCheckIn: "ඔබට විශ්වාසද? පැමිණීම සටහන් කිරීමට",
    areYouSureCheckOut: "ඔබට විශ්වාසද? පිටවීම සටහන් කිරීමට",
    // cancel: "අවලංගු කරන්න",

    // Login Page
    welcomeBack: "සාදරයෙන් පිළිගනිමු",
    enterCredentials: "කරුණාකර ඔබේ තොරතුරු ඇතුළත් කරන්න",
    nicNumber: "ජා.හැ.අ. අංකය",
    enterNic: "ඔබේ ජා.හැ.අ. අංකය ඇතුළත් කරන්න",
    password: "මුරපදය",
    enterPassword: "ඔබේ මුරපදය ඇතුළත් කරන්න",
    login: "ඇතුළු වන්න",
    forgotPassword: "මුරපදය අමතකද?",

    // Common/Status
    error: "Error",
    loading: "Loading...",
    success: "Success"
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