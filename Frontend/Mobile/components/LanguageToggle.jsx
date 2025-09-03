import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity style={styles.toggle} onPress={toggleLanguage}>
      <Text style={styles.toggleText}>
        {lang === 'en' ? '🇱🇰 සිං' : '🇺🇸 EN'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
});

export default LanguageToggle;