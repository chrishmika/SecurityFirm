import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to verify your assigned workplace.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required for this app to work properly.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return hasPermission;
  }
  return true;
};

// Call this in your App.js or HomePage before using location
export const initializeLocation = async () => {
  const hasPermission = await hasLocationPermission();
  
  if (!hasPermission) {
    const granted = await requestLocationPermission();
    if (!granted) {
      return false;
    }
  }
  
  return true;
};

// Environment setup for .env file
// Create a .env file in your project root with:
// EXPO_PUBLIC_API_URL=http://your-backend-url.com