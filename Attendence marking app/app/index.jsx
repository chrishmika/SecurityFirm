import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import i18n from '@/locales/i18n';

import { useRouter } from "expo-router";

const EXPIRY_TIME = 2000; // 2000 hours expiry time

const SearchableLocationSelector = () => {

  const router = useRouter();
  const { userInfo, isLoading, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const [locations, setLocations] = useState([
    { label: 'Location 1', value: 'location1' },
    { label: 'Location 2', value: 'location2' },
    { label: 'Location 3', value: 'location3' },
  ]);

  //language selecter
  const { language, changeLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [langItems, setLangItems] = useState([
    { label: 'English', value: 'en' },
    { label: 'සිංහල', value: 'si' },
  ]);

  useEffect(() => {
    if (!isLoading && !userInfo) {
      router.replace('/auth');
    }
  }, [isLoading, userInfo]);

  useEffect(() => {
    if (userInfo) {
      loadSelection();
    }
  }, [userInfo]);

  // Update i18n locale when language changes
  useEffect(() => {
    if (language) {
      i18n.locale = language;
    }
  }, [language]);

  // Save location selection with expiry time
  const saveSelection = async (location) => {
    try {
      const expiryTime = new Date().getTime() + EXPIRY_TIME * 60 * 60 * 1000;
      const data = { location, expiry: expiryTime };
      await AsyncStorage.setItem('selectedLocation', JSON.stringify(data));
      setSelectedLocation(location);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  // Load saved location and check-in status
  const loadSelection = async () => {
    try {
      const storedData = await AsyncStorage.getItem('selectedLocation');
      const checkInStatus = await AsyncStorage.getItem('checkedInStatus');

      if (checkInStatus) {
        setCheckedIn(JSON.parse(checkInStatus));
      }

      if (storedData) {
        const { location, expiry } = JSON.parse(storedData);
        const currentTime = new Date().getTime();

        if (currentTime < expiry) {
          setSelectedLocation(location); // Set stored location if still valid
        } else {
          await AsyncStorage.removeItem('selectedLocation'); // Remove expired data
          await AsyncStorage.removeItem('checkedInStatus');
          setCheckedIn(false);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Handle check in
  const handleCheckIn = async () => {
    if (!selectedLocation) {
      alert(i18n.t('selectLocation'));
      return;
    }

    try {
      await AsyncStorage.setItem('checkedInStatus', JSON.stringify(true));
      setCheckedIn(true);
      alert(i18n.t('successfulCheckIn'));
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  // Handle check out
  const handleCheckOut = async () => {
    try {
      await AsyncStorage.setItem('checkedInStatus', JSON.stringify(false));
      setCheckedIn(false);
      alert(i18n.t('successfulCheckOut'));
      // Note: We're not clearing the location so it persists until expiry
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      if (checkedIn) {
        alert(i18n.t('checkOutBeforeLogout'));
        return;
      }

      await AsyncStorage.removeItem('selectedLocation');
      setSelectedLocation(null);
      // Additional logout logic here
      alert(i18n.t('successfulLogout'));
      logout();
      router.replace('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('welcome')}</Text>
      <Text style={styles.title}>{i18n.t('markAttendance')}</Text>

      <DropDownPicker
        open={open}
        value={selectedLocation}
        items={locations}
        setOpen={setOpen}
        setValue={(val) => saveSelection(val)}
        setItems={setLocations}
        placeholder={i18n.t('selectLocation')}
        searchable={true}
        searchablePlaceholder={i18n.t('searchLocation')}
        searchablePlaceholderTextColor="gray"
        style={styles.dropdown}
        disabled={checkedIn} // Disable dropdown when checked in
      />

      <TouchableOpacity
        style={[styles.checkInButton, checkedIn && styles.disabledButton]}
        onPress={handleCheckIn}
        disabled={checkedIn}
      >
        <Text style={styles.checkInText}>{i18n.t('checkIn')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.checkOutButton, !checkedIn && styles.disabledButton]}
        onPress={handleCheckOut}
        disabled={!checkedIn}
      >
        <Text style={styles.checkOutText}>{i18n.t('checkOut')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
        <Text style={styles.LogoutText}>{i18n.t('logout')}</Text>
      </TouchableOpacity>

      <DropDownPicker
        open={langOpen}
        value={language}
        items={langItems}
        setOpen={setLangOpen}
        setValue={(val) => changeLanguage(val)}
        setItems={setLangItems}
        style={styles.languageDropdown}
        containerStyle={{ marginBottom: 10 }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkInButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  checkInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkOutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  checkOutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LogoutButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: '20%',
  },
  LogoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    borderColor: '#ccc',
    height: 50,
    width: '80%',
    marginBottom: 10,
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  languageDropdown: {
    borderColor: '#ccc',
    height: 50,
    width: '80%',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default SearchableLocationSelector;