import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

const EXPIRY_TIME = 2000; // 2000 hours expiry time

const SearchableLocationSelector = () => {

  const router = useRouter();
  const { userInfo , isLoading, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [locations, setLocations] = useState([
    { label: 'Location 1', value: 'location1' },
    { label: 'Location 2', value: 'location2' },
    { label: 'Location 3', value: 'location3' },
  ]);

  useEffect( () => {
    if(!isLoading && !userInfo) {
      router.replace('/auth');
    }
  }, [isLoading, userInfo]);

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
      alert('Please select a location first');
      return;
    }
    
    try {
      await AsyncStorage.setItem('checkedInStatus', JSON.stringify(true));
      setCheckedIn(true);
      alert('Successfully checked in!');
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  // Handle check out
  const handleCheckOut = async () => {
    try {
      await AsyncStorage.setItem('checkedInStatus', JSON.stringify(false));
      setCheckedIn(false);
      alert('Successfully checked out!');
      // Note: We're not clearing the location so it persists until expiry
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      if (checkedIn) {
        alert('Please check out before logging out');
        return;
      }
      
      await AsyncStorage.removeItem('selectedLocation');
      setSelectedLocation(null);
      // Additional logout logic here
      alert('Successfully logged out');
      logout();
      router.replace('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if(userInfo){
      loadSelection();
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Welcome User</Text>
      <Text style={styles.title}>Mark Attendance</Text>

      <DropDownPicker
        open={open}
        value={selectedLocation}
        items={locations}
        setOpen={setOpen}
        setValue={(val) => saveSelection(val)}
        setItems={setLocations}
        placeholder="Select a location"
        searchable={true}
        searchablePlaceholder="Search for a location"
        searchablePlaceholderTextColor="gray"
        style={styles.dropdown}
        disabled={checkedIn} // Disable dropdown when checked in
      />

      <TouchableOpacity 
        style={[styles.checkInButton, checkedIn && styles.disabledButton]} 
        onPress={handleCheckIn}
        disabled={checkedIn}
      >
        <Text style={styles.checkInText}>Check In</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.checkOutButton, !checkedIn && styles.disabledButton]} 
        onPress={handleCheckOut}
        disabled={!checkedIn}
      >
        <Text style={styles.checkOutText}>Check Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
        <Text style={styles.LogoutText}>Logout</Text>
      </TouchableOpacity>
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
  }
});

export default SearchableLocationSelector;