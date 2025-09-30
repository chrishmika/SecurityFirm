import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance } from "geolib";
import React, { createContext, useState } from "react";
import Geolocation from "react-native-geolocation-service";
import { useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const baseUrl = `${process.env.EXPO_PUBLIC_API_URL}/duty`;

  const [currentLocation, setCurrentLocation] = useState(null);
  const [assignedLocation, setAssignedLocation] = useState(null);
  const [dutyInfo, setDutyInfo] = useState(null); // Store duty details
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);

  const [statusInfo, setStatusInfo] = useState({
    checkInTime: null,
    checkOutTime: null,
    status: null,
    ot: 0
  });

  
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        (error) => {
          setError(`Location error: ${error.message}`);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  };

  // New function to fetch duty location for today
  const fetchTodaysDutyLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const employeeId = await AsyncStorage.getItem("employee_id");
      const authToken = await AsyncStorage.getItem("authToken");

      if (!employeeId || !authToken) {
        console.warn("User not authenticated - skipping duty location fetch");
        return null;
      }

      // Get current date
      const today = new Date();
      const year = today.getFullYear();
      const month = today.toLocaleString("en-US", { month: "long" });
      const day = today.getDate();

      const response = await fetch(`${baseUrl}/fetchlocation`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year,
          month,
          day,
          employeeId,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.warn("No duty assigned for today");
          return null;
        }
        throw new Error("Failed to fetch duty location");
      }

      const dutyData = await response.json();

      // Set both assigned location and duty info
      const locationData = {
        latitude: dutyData.latitude,
        longitude: dutyData.longitude,
        name: dutyData.name,
      };

      setAssignedLocation(locationData);
      setDutyInfo({
        dutyId: dutyData.dutyId,
        ...dutyData,
      });

      return dutyData;
    } catch (error) {
      setError(error.message);
      console.error("Duty location fetch error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Keep the original function for backward compatibility
  const fetchAssignedLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      //needed to check
      const nic = await AsyncStorage.getItem("nic");
      const authToken = await AsyncStorage.getItem("authToken");

      if (!nic || !authToken) {
        console.warn("User not authenticated - skipping location fetch");
        return null;
      }

      const response = await fetch(`${baseUrl}/location/${employee_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assigned location");
      }

      const locationData = await response.json();
      setAssignedLocation(locationData);
      return locationData;
    } catch (error) {
      setError(error.message);
      console.error("Location fetch error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const checkLocationMatch = (current, assigned, threshold = 100) => {
    if (!current || !assigned) return null;

    const distance = getDistance(
      { latitude: current.latitude, longitude: current.longitude },
      { latitude: assigned.latitude, longitude: assigned.longitude }
    );

    const isInRange = distance <= threshold;

    const status = {
      distance,
      isInRange,
      threshold,
      message: isInRange
        ? `${distance}m away`
        : `${distance}m away`,
    };

    setLocationStatus(status);
    return status;
  };

  const performLocationCheck = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current location
      const current = await getCurrentLocation();

      // Fetch duty location if not already loaded
      const assigned = assignedLocation || (await fetchTodaysDutyLocation());

      // If no assigned location (no duty for today), return early
      if (!assigned) {
        console.warn("Cannot perform location check - no duty assigned for today");
        return { current, assigned: null, status: null };
      }

      // Check if locations match
      const status = checkLocationMatch(current, assigned);

      return { current, assigned, status };
    } catch (error) {
      setError(error.message);
      console.error("Location check error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // New function to handle check-in
  const performCheckIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const locationCheck = await performLocationCheck();

      if (!locationCheck.status || !locationCheck.status.isInRange) {
        throw new Error("You must be at your assigned location to check in");
      }

      console.log("Sending check-in payload:", {
        dutyId: dutyInfo.dutyId,
        location: locationCheck.current,
      });

      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${baseUrl}/checkin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dutyId: dutyInfo.dutyId,
          location: locationCheck.current,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Server error response:", errorData);
        throw new Error(errorData.message || "Check-in failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setError(error.message);
      console.error("Check-in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

    const performCheckOut = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { current, assigned, status: locStatus } = await performLocationCheck();
      if (!locStatus.isInRange) {
        throw new Error("You must be at your assigned location to check out");
      }

      const token = await AsyncStorage.getItem("authToken");
      const res = await fetch(`${baseUrl}/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dutyId: dutyInfo.dutyId,
          location: current
        })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // Update local status
      setStatusInfo(prev => ({
        ...prev,
        checkOutTime: result.checkOutTime,
        ot: result.ot,
        status: "present"
      }));

      return result;
    } catch (e) {
      setError(e.message);
      console.error("Check-out error:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };


  const fetchDutyStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const res = await fetch(`${baseUrl}/${dutyInfo.dutyId}/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        // setStatusInfo(data);
        const isCheckedIn  = Boolean(data.checkInTime);
        const isCheckedOut = Boolean(data.checkOutTime);

    setStatusInfo({
      ...data,
      isCheckedIn,
      isCheckedOut
    });
      } else {
        console.warn("Status fetch error:", data.message);
      }
    } catch (e) {
      console.error("Failed fetching duty status", e);
    }
  };



  const value = {
    currentLocation,
    assignedLocation,
    dutyInfo,
    locationStatus,
    isLoading,
    error,
    getCurrentLocation,
    fetchAssignedLocation,
    fetchTodaysDutyLocation,
    checkLocationMatch,
    performLocationCheck,
    performCheckIn,
    performCheckOut,
    fetchDutyStatus,
    statusInfo,
    setIsLoading,
    setError,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
