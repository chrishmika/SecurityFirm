import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { useUser } from '../hooks/useUser';

const VerifyLocationComponent = () => {
  const {
    currentLocation,
    assignedLocation,
    locationStatus,
    isLoading,
    error,
    performLocationCheck,
    fetchAssignedLocation,
  } = useLocation();

  const { isAuthenticated, loading } = useUser();
  const [autoCheck, setAutoCheck] = useState(false);
  

  useEffect(() => {
    // Only fetch assigned location when user is authenticated and not loading
    if (isAuthenticated && !loading) {
      fetchAssignedLocation().catch(console.error);
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    let interval;
    if (autoCheck) {
      interval = setInterval(() => {
        performLocationCheck().catch(console.error);
      }, 30000); // Check every 30 seconds
    }
    return () => clearInterval(interval);
  }, [autoCheck]);

  const handleCheckLocation = async () => {
    try {
      await performLocationCheck();

      if (locationStatus) {
        Alert.alert(
          'Location Check',
          locationStatus.message,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleToggleAutoCheck = () => {
    setAutoCheck(!autoCheck);
  };

  const getStatusColor = () => {
    if (!locationStatus) return '#666';
    return locationStatus.isInRange ? '#4CAF50' : '#F44336';
  };

  if (isLoading && !currentLocation) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading location data...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Location Check
      </Text>

      {error && (
        <View style={{ backgroundColor: '#ffebee', padding: 10, marginBottom: 10, borderRadius: 5 }}>
          <Text style={{ color: '#c62828' }}>Error: {error}</Text>
        </View>
      )}

      {assignedLocation && (
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>Assigned Location:</Text>
          <Text>{assignedLocation.locationAddress}</Text>
          <Text>Lat: {assignedLocation.latitude}, Lng: {assignedLocation.longitude}</Text>
        </View>
      )}

      {currentLocation && (
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>Current Location:</Text>
          <Text>Lat: {currentLocation.latitude}, Lng: {currentLocation.longitude}</Text>
        </View>
      )}

      {locationStatus && (
        <View style={{
          backgroundColor: locationStatus.isInRange ? '#e8f5e8' : '#ffebee',
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
          borderLeftWidth: 4,
          borderLeftColor: getStatusColor()
        }}>
          <Text style={{ fontWeight: 'bold', color: getStatusColor() }}>
            Status: {locationStatus.isInRange ? 'IN RANGE' : 'OUT OF RANGE'}
          </Text>
          <Text>{locationStatus.message}</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button
          title="Check Location"
          onPress={handleCheckLocation}
          disabled={isLoading}
        />
        <Button
          title={autoCheck ? 'Stop Auto Check' : 'Start Auto Check'}
          onPress={handleToggleAutoCheck}
          color={autoCheck ? '#F44336' : '#4CAF50'}
        />
      </View>

      {isLoading && (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <ActivityIndicator />
          <Text>Checking location....</Text>
        </View>
      )}
    </View>
  );
};

export default VerifyLocationComponent;